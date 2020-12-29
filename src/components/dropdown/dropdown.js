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
    setOpen(false);
  };

  const handleChange = selectedValue => {
    onChange(selectedValue);
    setOpen(false);
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
            {options.map(opt => (
                <li key={opt} className="dropdown-option" onClick={e => handleChange(opt)}>
                {opt}
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};

export default Dropdown;
