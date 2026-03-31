import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function clampIndex(index, itemCount) {
  if (itemCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), itemCount - 1);
}

export function useSnapCarousel({ initialIndex = 0, itemCount = 0, loop = true } = {}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLooping = loop && itemCount > 1;
  const startIndex = clampIndex(initialIndex, itemCount);
  const options = useMemo(
    () => ({
      align: 'center',
      containScroll: isLooping ? false : 'trimSnaps',
      dragFree: false,
      duration: prefersReducedMotion ? 20 : 28,
      loop: isLooping,
      skipSnaps: false,
      startIndex
    }),
    [isLooping, prefersReducedMotion, startIndex]
  );
  const [viewportRef, emblaApi] = useEmblaCarousel(options);
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [canGoNext, setCanGoNext] = useState(itemCount > 1);
  const [canGoPrevious, setCanGoPrevious] = useState(itemCount > 1);
  const [isDragging, setIsDragging] = useState(false);

  const syncState = useCallback((api) => {
    if (!api || itemCount <= 0) {
      setActiveIndex(0);
      setCanGoNext(false);
      setCanGoPrevious(false);
      return;
    }

    setActiveIndex(api.selectedScrollSnap());
    setCanGoNext(isLooping || api.canScrollNext());
    setCanGoPrevious(isLooping || api.canScrollPrev());
  }, [isLooping, itemCount]);

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    emblaApi.reInit(options);
    emblaApi.scrollTo(startIndex, true);
    syncState(emblaApi);

    const handleSelect = () => syncState(emblaApi);
    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => {
      window.requestAnimationFrame(() => {
        setIsDragging(false);
      });
    };
    const handleSettle = () => {
      setIsDragging(false);
      syncState(emblaApi);
    };

    emblaApi.on('reInit', handleSelect);
    emblaApi.on('select', handleSelect);
    emblaApi.on('pointerDown', handlePointerDown);
    emblaApi.on('pointerUp', handlePointerUp);
    emblaApi.on('settle', handleSettle);

    return () => {
      emblaApi.off('reInit', handleSelect);
      emblaApi.off('select', handleSelect);
      emblaApi.off('pointerDown', handlePointerDown);
      emblaApi.off('pointerUp', handlePointerUp);
      emblaApi.off('settle', handleSettle);
    };
  }, [emblaApi, options, startIndex, syncState]);

  const goToNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const goToPrevious = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollToIndex = useCallback((index) => {
    if (!emblaApi || itemCount <= 0) {
      return;
    }

    emblaApi.scrollTo(clampIndex(index, itemCount));
  }, [emblaApi, itemCount]);

  const onViewportKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }
  }, [goToNext, goToPrevious]);

  return {
    activeIndex,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    isDragging,
    onViewportKeyDown,
    scrollToIndex,
    viewportRef
  };
}
