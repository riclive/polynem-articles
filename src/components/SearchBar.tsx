"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div style={{ position: "relative" }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Search articles…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: "13px",
          padding: "7px 12px 7px 32px",
          border: "1px solid var(--color-border)",
          borderRadius: "4px",
          background: "transparent",
          color: "var(--color-text-primary)",
          outline: "none",
          width: "180px",
          transition: "border-color 0.2s ease",
        }}
      />
    </div>
  );
}
