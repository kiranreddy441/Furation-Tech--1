import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsBookHalf} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {RiLogoutBoxRFill} from 'react-icons/ri'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="header-container">
      <p className="logo-name">
        <BsBookHalf className="icon" />
        Book Store
      </p>

      <ul className="list-container">
        <Link className="link" to="/">
          <li>Home</li>
        </Link>
        <Link className="link" to="/books">
          <li>Books List</li>
        </Link>
        <Link className="link" to="/cart">
          <li>Cart {renderCartItemsCount()}</li>
        </Link>

        <li>
          <button className="button" onClick={onClickLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
      <div className="small-device-container">
        <ul className="smallDevice-ul">
          <Link className="link" to="/">
            <li>
              <AiFillHome />
            </li>
          </Link>
          <Link className="link" to="/books">
            <li>
              <BsBookHalf />
            </li>
          </Link>
          <Link className="link" to="/cart">
            <li className="cart-number">
              <FaShoppingCart />
              {renderCartItemsCount()}
            </li>
          </Link>

          <li>
            <button
              className="small-device-button"
              onClick={onClickLogout}
              type="button"
            >
              <RiLogoutBoxRFill className="logout" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
