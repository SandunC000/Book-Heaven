import { useState, useEffect } from "react";
import styles from "../style";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/view-book")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <section id="library">
      <div className={`flex flex-col flex-row`}>
        <h2
          className={`font-poppins font-semibold ss:text-[72px] text-[52px] md:pt-10 text-white ${styles.flexCenter}`}
        >
          Book List
        </h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        {books.map((book) => (
          <div className="flex-col px-[10px] py-[20px] rounded-[20px] max-w-[350px] min-w-[350px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card">
            <p className={`${styles.bookName}`}>{book.title}</p>
            <p className={`${styles.author}`}>- {book.author} -</p>

            <div className="flex flex-col">
              <p className={`${styles.bookDetails}`}>
                Genre : {book.genre}
                <br />
                Published Date : {book.publication_date}
                <br />
                ISBN : {book.ISBN}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookList;

{
  /* <li key={book._id}>
            {book.title} by {book.author}
            {book.publication_date}
            {book.genre}
            {book.ISBN}
            {book.isRead ? " (Read)" : " (Unread)"}
  </li> */
}
