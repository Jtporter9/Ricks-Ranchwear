import React from 'react'
import { Link } from 'gatsby'

export default function InfoModal(props) {
    const { activeInfoModal, setActiveInfoModal } = props;
    return (
        <div>
            { activeInfoModal && (
                <div className="info-modal-opaque-background">
                    <div className="info-modal">
                        <h3>Buy 1 Pair Get Two Pair Free!</h3>
                        <p>
                            Select any 3 pairs of boots you like. There are no restrictions. You can mix and match mens, womens, kids, any size and any style. It’s based on the highest priced boot and the other two pairs are FREE! Once you have three pairs of boots in your cart, your total price will reflect the cost of the single highest priced pair.
                        </p>
                        <button onClick={() => setActiveInfoModal(false)} >
                            Continue Shopping
                        </button>
                        <Link to="/help#shipping">View Policies</Link>
                    </div>
                </div>
            )}
        </div>
    )
}
