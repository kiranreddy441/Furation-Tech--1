import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillStar, AiFillLinkedin, AiFillInstagram} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const price = 420

class BookDetails extends Component {
  state = {
    bookData: {},

    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getBookData()
  }

  getFormattedData = data => ({
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
    authorName: data.author_name,
    coverPic: data.cover_pic,
    id: data.id,
    rating: data.rating,
    title: data.title,
  })

  getBookData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.book_details)
      console.log(updatedData)

      this.setState({
        bookData: updatedData,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Books Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {bookData, quantity} = this.state
        const {
          aboutAuthor,
          aboutBook,
          title,
          id,
          authorName,
          coverPic,
          rating,
        } = bookData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...bookData, quantity})
        }

        return (
          <>
            <div className="content-container">
              <img className="image-details" src={coverPic} alt={title} />
              <div className="text">
                <p className="details-title">{title}</p>

                <p className="price">Rs {price}</p>
                <div className="rating-container">
                  <p className="rating">{rating}</p>
                  <AiFillStar className="image-star" />
                </div>
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button-add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <hr className="line" />
            <div className="bottom-text">
              <div className="about-name">
                <h1 className="name">About Author</h1>
                <p className="about">{aboutAuthor}</p>
              </div>
              <div>
                <h1 className="name">About Book</h1>
                <p className="about">{aboutBook}</p>
              </div>
            </div>
            <div className="follow-us">
              <p>Follow Us</p>
              <div className="icons-socila">
                <a href="https://www.linkedin.com/in/jyothikiran-reddy-challa-544844163/">
                  <AiFillLinkedin className="icon-linkdin" />
                </a>
                <a href="https://instagram.com/kiran_reddy441?igshid=MzNlNGNkZWQ4Mg==">
                  <AiFillInstagram className="icon-insta" />
                </a>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default BookDetails
