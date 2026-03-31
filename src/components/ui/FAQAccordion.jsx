import { useId, useState } from 'react';

export default function FAQAccordion({ items }) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const panelId = `${baseId}-${index}`;
        const isOpen = openItems.includes(index);

        return (
          <div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
            <button
              className="faq-q"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(index)}
            >
              <span>{item.question}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div
              className="faq-a"
              id={panelId}
              aria-hidden={!isOpen}
              style={isOpen ? { '--faq-panel-height': '320px' } : undefined}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
