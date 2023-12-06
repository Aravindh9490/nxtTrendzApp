import {useState} from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import './index.css'

const paymentMethods = [
  {id: 1, type: 'Card'},
  {id: 2, type: 'Net Banking'},
  {id: 3, type: 'UPI'},
  {id: 4, type: 'Wallet'},
  {id: 5, type: 'Cash on Delivery'},
]

const PaymentPopup = props => {
  const {totalAmount, items, afterOrderConfirm} = props

  const [conformOrder, setConformOrder] = useState(false)

  const onClickConfirm = () => {
    setConformOrder(true)
  }

  const conformOrderPlace = () => (
    <div className="orderConform">
      <FaCheckCircle color="green" size="100px" />
      <h4>Your order has been placed successfully</h4>
      <button
        className="orderConfirm"
        onClick={() => afterOrderConfirm()}
        type="button"
      >
        Close
      </button>
    </div>
  )

  const paymentOptions = () => (
    <div className="paymentOpt">
      <h1>Payment Options</h1>
      <div>
        <ul className="ulStyle">
          {paymentMethods.map(each => (
            <li key={each.id}>
              <input
                type="radio"
                name="paymentType"
                id={each.type}
                disabled={each.type !== 'Cash on Delivery'}
                checked={each.type === 'Cash on Delivery' ? 'true' : 'false'}
              />
              <label htmlFor={each.type}>{each.type}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="bold">Total Quantity: {items} </p>
        <p className="bold">Total Amount: {totalAmount}</p>
      </div>
      <div>
        <button type="button" className="orderConfirm" onClick={onClickConfirm}>
          Confirm Order
        </button>
      </div>
    </div>
  )

  return <>{conformOrder ? conformOrderPlace() : paymentOptions()}</>
}

export default PaymentPopup
