import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import closeIcon from '../../assets/close-icon.svg';
import copyIcon from '../../assets/copy.svg';

export default function EmailSubscriptionModal({ toggleModal }) {
    console.log(toggleModal)
    const [emailInput, setEmailInput] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies()
    const [failedEmailSubmission, setFailedEmailSubmission] = useState(null)
    const [successEmailSubmission, setSuccessEmailSubmission] = useState(false)
    const [copyButtonText, setCopyButtonText] = useState('Copy Discount Code')
    const discountCouponCode = 'SHIPFREE';

    function handleOnChange(event) {
        setEmailInput(event.target.value)
        setIsValidEmail(email_check(event.target.value))
    }

    function submitEmailSubscription(event) {
        event.preventDefault();
        createUser(emailInput)
    }

    function email_check(email) {
        var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return (email != '' && email != 'undefined' && regex.test(email));
    }

    function emailSubscripionDenial() {
        toggleModal(false)
        const today = new Date();
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        !cookies.emailSubscriptionExpiration && setCookie('emailSubscriptionExpiration', tomorrow.getTime())
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(discountCouponCode)
        setCopyButtonText('Copied Discount Code!')
        setTimeout(() => {
            setCopyButtonText('Copy Discount Code')
        }, 2000);
      }

    const createUser = (email) => {
        fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify([
                {
                    email: email,
                    first_name: 'Email subscription',
                    last_name: 'modal',

                }
            ])
        })
            .then(async res => ({ response: await res.json(), status: res.status }))
            .then(({ response, status }) => {
                console.log(response, status)
                if (status === 200) {
                    setSuccessEmailSubmission(true)
                    setCookie('emailSubscriptionSubmitted', true)
                    // fetch(`/.netlify/functions/bigcommerce?endpoint=checkouts/{id}/coupons`, {
                    //     method: 'POST',
                    //     credentials: 'same-origin',
                    //     mode: 'same-origin',
                    //     body: JSON.stringify(
                    //         {
                    //             coupon_code: "SHIPFREE"
                    //         }
                    //     )
                    // })
                } else {
                    setFailedEmailSubmission(true)
                }

            })
            .catch(error => {
                console.log("error", error)
            });
    };

    return (
        <div className="email-subscription-modal-opaque-background">
            <div className="email-subscription-modal">
                <div className="email-subscription-head">
                    <img src={closeIcon} alt="close" onClick={emailSubscripionDenial} />
                </div>
                {!successEmailSubmission && (
                    <div>
                        <h3>Free Shipping off your first order!</h3>
                        <p className="email-subscription-description">
                            Sign up for our email list to receive updates from Boot Factory Outlet and to receive free shipping off of your first order of up to 3 pairs of boots!
                    </p>
                        <form onSubmit={submitEmailSubscription}>
                            <input placeholder="Email Address" type="email" value={emailInput} onChange={handleOnChange} />
                            <div className="email-subscription-buttons-split">
                                <button onClick={emailSubscripionDenial}>No thanks</button>
                                <input style={{ cursor: isValidEmail ? 'pointer' : 'not-allowed' }} className="btn-dark" type="submit" value="Sign me up" disabled={isValidEmail ? "" : "disabled"} />
                            </div>
                        </form>
                        {failedEmailSubmission && (
                            <p className="submission-error">*Submission failed, or customer already exsists*</p>
                        )}
                    </div>
                )}
                {successEmailSubmission && (
                    <div className="success-state">
                        <h3>Thanks for signing up!</h3>
                        <p className="discount-code-label">FREE SHIPPING DISCOUNT CODE:</p> 
                        <h2>SHIPFREE</h2>
                        <p>One time use for each customer only.</p>
                        <div className="subscribed-box">
                            <span>Subscribed!</span>
                        </div>
                        <button onClick={copyToClipboard}>{copyButtonText} <img src={copyIcon}/></button>
                    </div>
                )}
                <p className="email-subscription-sub-text">
                    By signing up, you agree to our  Privacy Policy and Terms. We hat spam as much as you do, we promise to keep your email safe.
                </p>
            </div>
        </div>
    )
}
