import { func } from 'prop-types';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import closeIcon from '../../assets/close-icon.svg';

export default function EmailSubscriptionModal() {
    const [activeEmailSubscriptionModal, setActiveEmailSubscriptionModal] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies()

    function submitEmailSubscription() {
        setCookie('emailSubscriptionSubmitted', true)
        setActiveEmailSubscriptionModal(false)
    }

    return (
        <div>
            {activeEmailSubscriptionModal && (
                <div className="email-subscription-modal-opaque-background">
                    <div className="email-subscription-modal">
                        <div className="email-subscription-head">
                            <img src={closeIcon} alt="close" onClick={() => setActiveEmailSubscriptionModal(false)}/>
                        </div>
                        <h3>Free Shipping off your first order!</h3>
                        <p className="email-subscription-description">
                            Sign up for our email list to receive updates from Boot Factory Outlet and to receive free shipping off of your first order of up to 3 pairs of boots!
                        </p>
                        <input placeholder="Email Address" type="email" />
                        <div className="email-subscription-buttons-split">
                            <button>No thanks</button>
                            <button className="btn-dark" onClick={submitEmailSubscription}>Sign me up</button>
                        </div>
                        <p className="email-subscription-sub-text">
                            By signing up, you agree to our  Privacy Policy and Terms. We hat spam as much as you do, we promise to keep your email safe.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
