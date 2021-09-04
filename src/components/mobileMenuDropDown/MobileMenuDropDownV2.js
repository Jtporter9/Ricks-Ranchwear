import React, { useState } from 'react';
import { Link } from 'gatsby';

// ASSETS
import caretDown from '../../assets/caret-down.svg';
import caretUp from '../../assets/caret-up-dark.svg';

 const MobileMenuDropDownV2 = ({ content }) => {
  const [active, setActive] = useState(false);

  const {
    dropdownIdentifier = "",
    sectionHeader = "",
    sectionHeaderLink = "",
    navbarItems = [],
  } = content;

  return (
    <div className="mobile-menu-dropdown-container">
            <span onClick={() => setActive(!active)}>
                {dropdownIdentifier}
              <img alt="Open/Close" src={active ? caretUp : caretDown} />
            </span>
      {active && (
        <ul>
          <Link to={sectionHeaderLink}><li>{sectionHeader}</li></Link>
          {navbarItems.length > 0 && navbarItems.map(dropdownItem => dropdownItem.navbarSubitems.map((item, i) => (
            <Link to={item.link} key={i}><li>{item.text}</li></Link>
          )))}
        </ul>
      )}
    </div>
  )
};

export default MobileMenuDropDownV2;
