export default function ScrollChrome({ progress, label, visible }) {
  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className={`section-indicator ${visible ? 'visible' : ''}`}>
        <div className="section-indicator-dot" />
        <span className="section-indicator-label">{label}</span>
      </div>
    </>
  );
}
