import React from 'react'

export default function EmailSubscriptionModal() {
    return (
        <div>
            <div className="email-subscription-modal-opaque-background">
                <div className="email-subscription-modal">
                    <div className="email-subscription-head">
                        <h3>Free Shipping off your first order!</h3>
                    </div>
                    <p>
                        Sign up for our email list to receive updates from Boot Factory Outlet and to receive free shipping off of your first order of up to 3 pairs of boots!
                    </p>
                        <input type="text"/>
                        <button>No thanks</button>
                        <button>Sign me up</button>
                    <p>
                    By signing up, you agree to our  Privacy Policy and Terms. We hat spam as much as you do, we promise to keep your email safe.
                    </p>
                </div>
            </div>
        </div>
    )
}
