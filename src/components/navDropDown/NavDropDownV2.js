import React from "react";
import { Link } from 'gatsby';

export default function NavDropDown({ closeDropDownNav, content }) {

  const {
    sectionHeader = "",
    sectionHeaderLink = "",
    navbarItems = []
  } = content[0];

  // Experiment with the structure of the links since some of the store links dont properly work due to the query strings

  return (
    <div className="nav-drop-down" onMouseLeave={closeDropDownNav}>
      <div>
        <Link className="all-link" to={sectionHeaderLink}>{sectionHeader}</Link>
      </div>
      {navbarItems && navbarItems.map((item, i) => (
        <div key={i}>
          <h3>{item.itemHeader}</h3>
          {item.navbarSubitems.map((subItem, i) => (
            <Link to={subItem.link} key={i}>{subItem.text}</Link>
          ))}
        </div>
      ))}
    </div>
  )
}