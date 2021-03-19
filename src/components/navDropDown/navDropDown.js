import React, { useState, useEffect } from "react";
import { Link } from 'gatsby';

import { options } from './navDropDownOptions';

export default function NavDropDown({ type }) {
    const [typeObject, setTypeObject] = useState(false)

    useEffect(() => {
        type !== typeObject.key && options.map(option => option.key === type && setTypeObject(option))   
    }, [type, typeObject, options])

    return (
            <div className="nav-drop-down">
                <div>
                    <Link className="all-link" to="/mens">{typeObject.head}</Link>
                </div>
                {typeObject && typeObject.dropdownList.map((list, i) => (
                    <div key={i}>
                        <h3>{list.head}</h3>
                        {list.listItems.map((item, i) => (
                            <Link to={item.location} key={i}>{item.name}</Link>
                        ))}
                    </div>
                ))}
            </div>
    )
}