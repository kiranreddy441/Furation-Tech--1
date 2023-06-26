import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const BookItem = props => {
  const {details} = props
  const {authorName, coverPic, id, rating, title} = details

  return (
    <Link className="link-item" to={`/books/${id}`}>
      <li className="book-item">
        <img className="image" src={coverPic} alt={title} />
        <div className="book-text-container">
          <p className="book-title">{title}</p>
          <p className="book-author">{authorName}</p>
          <p className="book-rating">
            Rating
            <span className="span-element">
              <AiFillStar className="icon-star" />
              <AiFillStar className="icon-star" />
              <AiFillStar className="icon-star" />
            </span>
            {rating}
          </p>
          <button className="book-button" type="button">
            View Details
          </button>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
