import {useState} from 'react'
import Popup from 'reactjs-popup'
import {IoCloseCircleOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

import PaymentPopup from '../PaymentPopup'

import './index.css'

const CartSummary = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        const items = cartList.length

        const afterOrderConfirm = () => {
          removeAllCartItems()
        }

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
                /-
              </h1>

              <Popup
                trigger={
                  <div>
                    <button type="button" className="checkout-button d-sm-none">
                      Checkout
                    </button>
                    <button type="button" className="checkout-button d-lg-none">
                      Checkout
                    </button>
                  </div>
                }
                modal
              >
                {close => (
                  <div className="popup-bg">
                    <div className="close-btn-align">
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        <IoCloseCircleOutline size="40px" />
                      </button>
                    </div>
                    <PaymentPopup
                      totalAmount={total}
                      items={items}
                      afterOrderConfirm={afterOrderConfirm}
                    />
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
