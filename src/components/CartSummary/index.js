import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const price = 420
const CartSummary = () => {
  const [isTrue, setIsTrue] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0

        cartList.forEach(product => {
          total += price * product.quantity
        })

        const onClickButton = () => {
          setIsTrue(prev => !prev)
        }

        return (
          <div className="total-container">
            <h1 className="head">
              Order Total:
              <span>Rs {total}</span>
            </h1>
            <p>{cartList.length} items</p>
            {isTrue ? (
              <>
                <button
                  onClick={onClickButton}
                  className="check-button-success"
                  type="button"
                >
                  Order Placed
                </button>
              </>
            ) : (
              <button
                onClick={onClickButton}
                className="check-button"
                type="button"
              >
                Place Order
              </button>
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
