import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickButton = () => {
    const {history} = props
    history.replace('/books')
  }
  return (
    <>
      <Header />
      <div className="books-container">
        <div className="text-part">
          <h1 className="home-head">
            WELCOME TO <br />
            <span className="span-home">BOOK STORE</span>
          </h1>
          <p className="home-paragraph">
            Books are the hub of all information and knowledge.
            <br />
            They help us gather data and understand it better.
            <br /> That's the thing about books.they let you <br />
            travel without moving your feet
          </p>
          <button onClick={onClickButton} className="home-button" type="button">
            Find Books
          </button>
        </div>
        <div className="second-part">
          <img
            className="home-image"
            src="https://res.cloudinary.com/mari123/image/upload/v1687603508/bookimage_nmut9b.png"
            alt="home"
          />
        </div>
      </div>
    </>
  )
}

export default Home
