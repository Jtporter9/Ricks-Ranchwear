import { func } from 'prop-types';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import closeIcon from '../../assets/close-icon.svg';

export default function EmailSubscriptionModal() {
    const [activeEmailSubscriptionModal, setActiveEmailSubscriptionModal] = useState(true);
    const [emailInput, setEmailInput] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies()

    function handleOnChange(event) {
        setEmailInput(event.target.value)
        setIsValidEmail(email_check(event.target.value))
    }

    function submitEmailSubscription(event) {
        event.preventDefault();
        console.log(emailInput)
        createUser(emailInput)
        setActiveEmailSubscriptionModal(false)
        setCookie('emailSubscriptionSubmitted', true)
    }

    function email_check(email) {
        var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return (email != '' && email != 'undefined' && regex.test(email));
    }

    const createUser = (email) => {
        fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'same-origin',
          body: JSON.stringify({
            line_items: [
              {
                email: email,
                first_name: null,
                last_name: null,
              }
            ]
          })
        })
          .then(async res => ({ response: await res.json(), status: res.status }))
          .then(({ response, status }) => {
              console.log(response)
            // if (status === 404 && !retry) {
            //   // re create a cart if cart was destroyed
            //   return fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
            //     credentials: 'same-origin',
            //     mode: 'same-origin'
            //   }).then(() => addToCart(productId, variantId, true));
            // }
            // status < 300 && addNotification('Item added successfully');
    
          })
          .catch(error => {
            console.log("error")
          });
      };

    return (
        <div>
            {activeEmailSubscriptionModal && (
                <div className="email-subscription-modal-opaque-background">
                    <div className="email-subscription-modal">
                        <div className="email-subscription-head">
                            <img src={closeIcon} alt="close" onClick={() => setActiveEmailSubscriptionModal(false)} />
                        </div>
                        <h3>Free Shipping off your first order!</h3>
                        <p className="email-subscription-description">
                            Sign up for our email list to receive updates from Boot Factory Outlet and to receive free shipping off of your first order of up to 3 pairs of boots!
                        </p>
                        <form onSubmit={submitEmailSubscription}>
                            <input placeholder="Email Address" type="email" value={emailInput} onChange={handleOnChange} />
                            <div className="email-subscription-buttons-split">
                                <button onClick={() => setActiveEmailSubscriptionModal(false)}>No thanks</button>
                                <input style={{ cursor: isValidEmail ? 'pointer' : 'not-allowed'}} className="btn-dark" type="submit" value="Sign me up" disabled={isValidEmail ? "" : "disabled"} />
                            </div>
                        </form>
                        <p className="email-subscription-sub-text">
                            By signing up, you agree to our  Privacy Policy and Terms. We hat spam as much as you do, we promise to keep your email safe.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
