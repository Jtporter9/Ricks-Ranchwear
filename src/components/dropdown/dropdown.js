import React, { useEffect, useState, useRef } from "react";
import caretDownLight from '../../assets/caret-down-light.svg';

const Dropdown = ({ dropDownClasses, value, options, placeholder = "Select", onChange }) => {
  const node = useRef();

  const [open, setOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    dropDownClasses.head !== 'products-side-filter-head' && setOpen(false);
  };

  const handleChange = selectedValue => {
    onChange(selectedValue);
    dropDownClasses.head !== 'products-side-filter-head' && setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div ref={node} className="filter-drop-down">
      <div className={`${dropDownClasses.head}`} onClick={e => setOpen(!open)}>
        <span>{value || placeholder}</span>
        <img src={caretDownLight} alt="Dropdown" />
      </div>
      {open && (
        <ul className={`${dropDownClasses.optionContainer}`}>
          {options.map(opt => {
            if (placeholder === "Best Selling") {
              return (
                <li key={opt} className="dropdown-option" onClick={e => handleChange(opt)}>
                  {opt}
                </li>
              );
            } else {
              if (value === "Size" || value === "Width") {
                return <button key={opt} className="dropdown-swatch" onClick={e => handleChange(opt)}>{opt}</button>
              }
              if (value === "Brand" || value === "Color") {
                    return (
                      <li key={opt} className="dropdown-option" onClick={e => handleChange(opt)}>
                        {opt}
                      </li>
                    )
              }
              if (value === "Material" || value === "Toe Shape" || value === "Style") {
                return (
                  <div key={opt} className="dropdown-checkbox-container">
                    <input id={opt} type="checkbox" value={opt} className="dropdown-option" onClick={e => handleChange(opt)} />
                    <label htmlFor={opt}>{opt}</label>
                  </div>
                )
              }
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
