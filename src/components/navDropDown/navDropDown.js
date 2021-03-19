import React from 'react'
import { Link } from 'gatsby';

export default function navDropDown() {
    return (
        <div className="nav-drop-down">
            <div>
                <Link className="all-link" to="/mens">All Mens</Link>
            </div>
            <div>
                <h3>Style</h3>
                <Link to="/mens">Western Boots</Link>
                <Link to="/mens">Work Boots</Link>
                <Link to="/mens">Motorcycle Boots</Link>
            </div>
            <div>
                <h3>Toe Shape</h3>
                <Link to="/mens">Traditional</Link>
                <Link to="/mens">Square</Link>
            </div>
        </div>
    )
}
