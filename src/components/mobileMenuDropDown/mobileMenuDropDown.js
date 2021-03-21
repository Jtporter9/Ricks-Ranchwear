import React, { useState } from 'react';
import { Link } from 'gatsby';

// ASSETS
import caretDown from '../../assets/caret-down.svg';
import caretUp from '../../assets/caret-up-dark.svg';

export default function MobileMenuDropDown({ data }) {
    const [active, setActive] = useState(false);

    const {
        key,
        head,
        slug,
        dropdownList
    } = data;

    return (
        <div className="mobile-menu-dropdown-container">
            <span onClick={() => setActive(!active)}>
                {key}
                <img alt="Open/Close" src={active ? caretUp : caretDown} />
            </span>
            {active && (
                <ul>
                    <Link to={`${slug}`}><li>{head}</li></Link>
                    {dropdownList.map(dropdown => dropdown.listItems.map((item, i) => (
                        <Link to={`${item.location}?type=${dropdown.head}&value=${item.name}`} key={i}><li>{item.name}</li></Link>
                    )))}
                </ul>
            )}
        </div>
    )
}
