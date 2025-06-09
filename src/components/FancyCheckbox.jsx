import React from "react";
import "../styles/FancyCheckbox.css";

export default function FancyCheckbox({ id, checked, onChange }) {
  return (
    <label className="fancy-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <svg viewBox="0 0 18 18" className="checkbox-svg">
        <rect x="1" y="1" width="16" height="16" rx="3" ry="3" className="checkbox-border" />
        <polyline points="3.5 9.5 7 13 14 5" className="checkbox-tick" />
      </svg>
    </label>
  );
}
