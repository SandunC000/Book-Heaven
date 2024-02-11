import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../style";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/view-book");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (bookId) => {
    Navigate(`/get-book/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/delete-book/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsRead = async (bookId) => {
    try {
      await axios.patch(`http://localhost:3000/mark-as-read/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id='library'>
      <div className={`flex flex-col flex-row`}>
        <h2 className={`${styles.heading1}`}>Book List</h2>
      </div>

      <div className={`${styles.flexCenter} flex-row flex-wrap`}>
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className={`flex justify-between flex-col px-7 py-5 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card ${
                book.isRead ? "feedback-card-is-read" : ""
              }`}
            >
              <div>
                <p className={`${styles.bookName}`}>{book.title}</p>
                <p className={`${styles.author}`}>- {book.author} -</p>
                <div className='flex flex-col'>
                  <p className={`${styles.bookDetails}`}>
                    Genre: {book.genre}
                    <br />
                    Published Date: {book.publicationDate}
                    <br />
                    ISBN: {book.ISBN}
                    <br />
                    Is Read? :{" "}
                    <span className={book.isRead ? "text-green-500" : ""}>
                      {book.isRead ? "Yes" : "Not yet"}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex justify-between mt-4 text-white'>
                <Link key={book} to={`/bookedit/${book._id}`}>
                  <button className={`${styles.button}`} onClick={() => handleEdit(book._id)}>
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(book._id)}
                  className={`${styles.buttonCancel} ml-2`}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleMarkAsRead(book._id)}
                  className={`${styles.button} ml-2`}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`text-center px-20 py-10 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 text-white feedback-card-is-read`}
          >
            There are no books in the library. <br />
            Add a New Book to continue.
          </div>
        )}
      </div>
    </section>
  );
};

export default BookList;
