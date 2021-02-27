import React, { useState } from 'react'
import { Link } from 'gatsby'

//ASSESTS
import closeCollapsible from '../../assets/close-collapsible.svg';
import openCollapsible from '../../assets/open-collapsible.svg';

export default function ProductDetailsCollapsible(props) {
    const { title, description, custom_fields } = props;
    const [activeCollapsible, setActiveCollapsible] = useState(true);

    return (
        <div className="collapsible" onClick={() => setActiveCollapsible(!activeCollapsible)}>
            <div className="split-title">
                <h4 className={`bc-single-product__section-title ${activeCollapsible ? 'underline' : ''}`}>{title}</h4>
                <img src={activeCollapsible ? closeCollapsible : openCollapsible}/>
            </div>
            {activeCollapsible && (
                <div className="collapsible-details-container">
                    {/* DESCRIPTION  */}
                    {title === 'Description' && (
                        <div
                            className="field-detail"
                            dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    )}
                    {title === 'Description' && custom_fields.map((field, i) => (
                        field.name === 'Style Number' && <div className="field-detail" key={i}><strong>{field.name}:</strong> <span>{field.value}</span></div>
                    )
                    )}
                    {title === 'Features' && custom_fields.map((field, i) => (
                        field.name !== 'Style Number' && <div className="field-detail" key={i}><strong>{field.name}:</strong> <span>{field.value}</span></div>
                    )
                    )}
                    {title === 'Shipping and Returns' && (
                        <div>
                            <div className="field-detail"><strong>Shipping:</strong> <span>$15 flat rate shipping per every 3 pairs of boots.</span> <span className="small">(the continental US only) <Link to="/help#shipping">View Policies</Link></span></div>
                            <div className="field-detail"><strong>Returns:</strong> <span>$15 return shipping cost per every 3 pairs of boots.</span> <span className="small">(continental US only, free in-store)</span></div>
                            <div className="field-detail"><strong>Exchanges:</strong> <span>$12 exchange fee per every 1 pair of boots or $30 per 3 pairs.</span> <span className="small">(continental US only, free in-store)</span></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
