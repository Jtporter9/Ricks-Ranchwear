import React, { useEffect, useState } from 'react';

// ASSESTS
import caretDownRed from 'assets/caret-down-red.svg';
import caretUpRed from 'assets/caret-up-red.svg';
import timeIconRed from 'assets/time-icon-red.svg';
import locationIconRed from 'assets/location-icon-red.svg';
import phoneIconRed from 'assets/phone-icon-red.svg';
import nashvilleMusicCityLogo from 'assets/nashville-music-city-logo.png';

export default function StoreCollapsible(props) {
  const {
    defaultCollapsibleValue = false,
    location,
    last,
    selectedStore,
  } = props;

  // STATES
  const [collapsibleState, setCollapsibleState] = useState(defaultCollapsibleValue);
  const [storesLoaded, setStoresLoaded] = useState(false);

  const clickedAnchorLink = "clickedAnchorLink";

  useEffect(() => {
    if(!storesLoaded && selectedStore) {
      const storeLink  = document.getElementById(clickedAnchorLink)
      storeLink.click();
      setStoresLoaded(true);
    }
  }, []);

  return (
    <div className="store-collapsible">
      <button type="button" className={`info-collapsible ${collapsibleState && 'info-collapsible-active'} ${last && 'last'}`} onClick={() => setCollapsibleState(!collapsibleState)}>
        <h2 className="info-collapsible-title">{location.stateStores[0].state}</h2>
        <img src={collapsibleState ? caretDownRed : caretUpRed} alt={collapsibleState ? 'close' : 'open'} />
      </button>
      <div style={{ display: `${collapsibleState ? 'block' : 'none'}` }} className="info-collapsible-meta">
        {location.stateStores.map((
          {
            body,
            company,
            image,
            location,
            state,
            store_hours: { body: hoursBody },
            address: { city_state, post_code, street },
            phone
          },
          i
        ) => {
          const anchorName = location.split(",")[0].replace(/\s/g, "");

          console.log(anchorName)
          return (
            <>
              <a href={`#${selectedStore}`} id={clickedAnchorLink}/>
              <a id={anchorName}/>
              <div style={{marginBottom: '2rem'}} key={i}>
                <div className="store-info-split">
                  <div className="split-left">
                    <img src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} alt={state}/>
                  </div>
                  <div className="split-right">
                    <h2>{company}</h2>
                    <h3>{location}</h3>
                    <p>{body}</p>
                  </div>
                </div>
                {location.toLowerCase().includes("nashville") && (
                  <div className="nashville-logo">
                    <img src={nashvilleMusicCityLogo} alt="nashville city logo"/>
                  </div>
                )}
                <div className="icon-info-split">
                  <div className="icon-container-split">
                    <img src={timeIconRed} alt="hours"/>
                    <span>Hours</span>
                    <p>{hoursBody}</p>
                  </div>
                  <div className="icon-container-split">
                    <img src={locationIconRed} alt="location"/>
                    <span>Address</span>
                    <p>{street}<br/>{city_state} {post_code}</p>
                  </div>
                  <div className="icon-container-split">
                    <img src={phoneIconRed} alt="phone number"/>
                    <span>Phone</span>
                    <p>{phone}</p>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
