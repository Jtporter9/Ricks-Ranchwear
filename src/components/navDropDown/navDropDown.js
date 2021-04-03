import React, { useState, useEffect, useContext } from "react";
import { Link } from 'gatsby';

import { options } from './navDropDownOptions';

export default function NavDropDown({ type, closeDropDownNav }) {
    // const [appState, setAppState ] = useContext(AppContext);

    // console.log(1, appState)
    const [typeObject, setTypeObject] = useState(false)

    useEffect(() => {
        type !== typeObject.key && options.map(option => option.key === type && setTypeObject(option))   
    }, [type, typeObject, options])

    return (
            <div className="nav-drop-down" onMouseLeave={closeDropDownNav}>
                <div>
                    <Link className="all-link" to={`${typeObject.slug}`}>{typeObject.head}</Link>
                </div>
                {typeObject && typeObject.dropdownList.map((list, i) => (
                    <div key={i}>
                        <h3>{list.head}</h3>
                        {list.listItems.map((item, i) => (
                            <Link to={ `${item.location}?type=${list.head}&value=${item.name}`} key={i}>{item.name}</Link>
                        ))}
                    </div>
                ))}
            </div>
    )
}