import React, { useState } from 'react';
import plusIcon from '../../assets/plus.svg';
import minusIcon from '../../assets/minus.svg';

export default function InfoCollapsible(props) {
    const { title, content, last } = props;

    // STATES 
    const [collapsibleState, setCollapsibleState] = useState(false);

    return (
        <div>
            <button type="button" className={`info-collapsible ${collapsibleState && 'info-collapsible-active'} ${last && 'last'}`} onClick={() => setCollapsibleState(!collapsibleState)}>
                <span className="info-collapsible-title">{title}</span>
                <img src={collapsibleState ? minusIcon : plusIcon} alt={collapsibleState ? 'close' : 'open'} />    
            </button>
            <div style={{ display: `${collapsibleState ? 'block' : 'none'}` }} className="info-collapsible-meta">
                <p>{content}</p>
            </div>
        </div>
    )
}
