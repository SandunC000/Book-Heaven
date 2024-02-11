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
    return <Navigate to={`/get-book/${bookId}?edit=true`} />;
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
    <section id="library">
      <div className={`flex flex-col flex-row`}>
        <h2 className={`${styles.heading1}`}>Book List</h2>
      </div>

      <div className="flex flex-row flex-wrap justify-center">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="flex-col px-[10px] py-[20px] rounded-[20px] max-w-[350px] min-w-[350px] md:mr-10 sm:mr-5 mr-0 my-5 feedback-card clickable"
            >
              <Link to={`/get-book/${book._id}`}>
                <p className={`${styles.bookName}`}>{book.title}</p>
                <p className={`${styles.author}`}>- {book.author} -</p>
                <div className="flex flex-col">
                  <p className={`${styles.bookDetails}`}>
                    Genre: {book.genre}
                    <br />
                    Published Date: {book.publication_date}
                    <br />
                    ISBN: {book.ISBN}
                    <br />
                    Is Read? :{" "}
                    <span className={book.isRead ? "text-green-500" : ""}>
                      {book.isRead ? "Yes" : "Not yet"}
                    </span>
                  </p>
                </div>
              </Link>
              <div className="flex justify-between mt-4 text-white">
                <button
                  className={`${styles.button}`}
                  onClick={() => handleEdit(book._id)}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className={`${styles.button}`}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleMarkAsRead(book._id)}
                  className={`${styles.button}`}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>//add a card</div>
        )}
      </div>
    </section>
  );
};

export default BookList;
