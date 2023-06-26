import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Header from '../Header'
import BookItem from '../BookItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BooksList = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
  })
  const [booksList, setBooksList] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getBooksData = async () => {
      setApiResponse({status: apiStatusConstants.inProgress, booksList: []})
      const url = 'https://apis.ccbp.in/book-hub/books'
      const jwtToken = Cookies.get('jwt_token')
      console.log(jwtToken)

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      if (response.ok === true) {
        const data = await response.json()
        const {books} = data

        const updatedData = books.map(eachBook => ({
          authorName: eachBook.author_name,
          coverPic: eachBook.cover_pic,
          id: eachBook.id,
          rating: eachBook.rating,
          title: eachBook.title,
        }))

        setApiResponse({
          status: apiStatusConstants.success,
        })
        setBooksList(updatedData)
      } else {
        setApiResponse({status: apiStatusConstants.failure})
      }
    }
    getBooksData()
  }, [])

  const searchResults = booksList.filter(eachDestination =>
    eachDestination.title.toLowerCase().includes(search.toLowerCase()),
  )
  console.log(searchResults)

  const renderSuccessView = () => {
    const onChangeSearchInput = event => {
      setSearch(event.target.value)
    }
    return (
      <div className="total-container">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={apiResponse.search}
            onChange={onChangeSearchInput}
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
            alt="search icon"
            className="search-icon"
          />
        </div>
        <ul className="books-container">
          {searchResults.map(eachBook => (
            <BookItem key={eachBook.id} details={eachBook} />
          ))}
        </ul>
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <h1 className="failure">Something went wrong....</h1>
    </div>
  )

  const renderAllProducts = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      {renderAllProducts()}
    </>
  )
}

export default BooksList
