import React, { useEffect, useState, useRef } from "react";
import caretDownLight from '../../assets/caret-down-light.svg';
import caretUpDark from '../../assets/caret-up-dark.svg';

const Dropdown = ({ dropDownClasses, value, options, placeholder = "Select", onChange, selectedFilters = [], defaultOpenState = false }) => {
  const node = useRef();

  const [open, setOpen] = useState(defaultOpenState);

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
        <span className={`${open && 'dropdown-open'}`}>{value || placeholder}</span>
        <img src={open ? caretUpDark : caretDownLight} alt="Dropdown" />
      </div>
      {open && (
        <ul className={`${dropDownClasses.optionContainer}`}>
          {options.map(opt => {
            let active = selectedFilters.indexOf(opt) !== -1;
            if (placeholder === "Best Selling") {
              return (
                <li key={opt} className="dropdown-option" onClick={e => handleChange(opt)}>
                  {opt}
                </li>
              );
            } else {
              if (value === "Size" || value === "Width") {
                return <button key={opt} className={`dropdown-swatch ${active ? 'dropdown-swatch-active' : ''}`} onClick={e => handleChange(opt)}>
                  <span>{opt}</span>
                  </button>
              }
              // if (value === "Color") {
              //       return (
              //         <li key={opt} className={`dropdown-option ${active ? 'dropdown-option-selected' : ''}`} onClick={e => handleChange(opt)}>
              //           <span>{opt}</span>
              //         </li>
              //       )
              // }
              if (value !== "Size" || value !== "Width") {
                return (
                  <div key={opt} className="dropdown-checkbox-container">
                    <input id={opt} type="checkbox" value={opt} className="dropdown-option" onChange={e => handleChange(opt)} checked={active} />
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
