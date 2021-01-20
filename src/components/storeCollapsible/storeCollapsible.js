import React, { useState } from 'react';

// ASSESTS
import caretDownRed from '../../assets/caret-down-red.svg';
import caretUpRed from '../../assets/caret-up-red.svg';
import timeIconRed from '../../assets/time-icon-red.svg';
import locationIconRed from '../../assets/location-icon-red.svg';
import phoneIconRed from '../../assets/phone-icon-red.svg';

export default function StoreCollapsible(props) {
    const { store: {
        body,
        company,
        image,
        location,
        state
    } } = props;


    // STATES 
    const [collapsibleState, setCollapsibleState] = useState(false);

    return (
        <div className="store-collapsible">
            <button type="button" className={`info-collapsible ${collapsibleState && 'info-collapsible-active'}`} onClick={() => setCollapsibleState(!collapsibleState)}>
                <h2 className="info-collapsible-title">{state}</h2>
                <img src={collapsibleState ? caretDownRed : caretUpRed} alt={collapsibleState ? 'close' : 'open'} />
            </button>
            <div style={{ display: `${collapsibleState ? 'block' : 'none'}` }} className="info-collapsible-meta">
                <div className="store-info-split">
                    <div className="split-left">
                        <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} alt={state}/>
                    </div>
                    <div className="split-right">
                        <span>{company}</span>
                        <h3>{location}</h3>
                        <p>{body}</p>
                    </div>
                </div>
                <div className="icon-info-split">
                    <div className="icon-container-split">
                        <img src={timeIconRed} alt="hours"/>
                        <span>Hours</span>
                        <p>blah</p>
                    </div>
                    <div className="icon-container-split">
                        <img src={locationIconRed} alt="location"/>
                        <span>Address</span>
                        <p>blah</p>
                    </div>
                    <div className="icon-container-split">
                        <img src={phoneIconRed} alt="phone number"/>
                        <span>Phone</span>
                        <p>blah</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
