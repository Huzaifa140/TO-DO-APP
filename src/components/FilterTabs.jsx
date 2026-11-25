const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "To do" },
  { key: "done", label: "Done" },
];

export default function FilterTabs({ value, onChange, counts }) {
  return (
    <div className="tabs" role="tablist" aria-label="Filter tasks">
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          aria-selected={value === t.key}
          className={`tab ${value === t.key ? "tab-on" : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label} <span className="tab-count">{counts[t.key]}</span>
        </button>
      ))}
    </div>
  );
}
