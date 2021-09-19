//Node Modules
import React from 'react'
import { Link } from 'gatsby'

const InfoModal = ({
    content,
    activeInfoModal,
    setActiveInfoModal,
}) => {
    return (
        <div>
            { activeInfoModal && content && (
                <div className="info-modal-opaque-background">
                    <div className="info-modal">
                        <h3>{content.modalHeader}</h3>
                        <p>{content.modalContent}</p>
                        <button onClick={() => setActiveInfoModal(false)}>
                            {content.continueButtonText}
                        </button>
                        <Link to={content.policiesButton.link}>
                            {content.policiesButton.text}
                        </Link>
                    </div>
                </div>
            )}
            { activeInfoModal && !content && (
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

export default InfoModal;
