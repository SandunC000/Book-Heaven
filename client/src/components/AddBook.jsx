// File: src/components/AddBook.js
import { useState } from "react";
import styles from "../style";
import axios from "axios";

const AddBook = ({onAddBook}) => {
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publication_date: "",
    genre: "",
    ISBN: "",
  });

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    axios
      .post("http://localhost:3000/upload-book", newBook, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        onAddBook(response.data);
        setNewBook({
          title: "",
          author: "",
          genre: "",
          ISBN: "",
          publication_date: "",
        });
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  return (
    <section id="addBook" className="bg-primary h-screen">
      <h2 className={`${styles.heading1} mb-10`}> Add a New Book</h2>

      <form className="w-full flex flex-col">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className={`${styles.formLabel}`} name="title">
              Title
            </label>
            <input
              className={`${styles.formInput}`}
              name="title"
              type="text"
              placeholder="Book Title..."
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full px-3">
            <label className={`${styles.formLabel}`} name="authorName">
              Author Name
            </label>
            <input
              className={`${styles.formInput}`}
              name="author"
              type="text"
              placeholder="Author Name..."
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className={`${styles.formLabel}`} name="genre">
              Genre
            </label>
            <input
              className={`${styles.formInput}`}
              type="text"
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
              placeholder="Genre"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className={`${styles.formLabel}`} name="publicationDate">
              Publication Date
            </label>
            <input
              className={`${styles.formInput}`}
              name="publication_date"
              type="date"
              value={newBook.publication_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className={`${styles.formLabel}`} name="ISBN">
              ISBN
            </label>
            <input
              className={`${styles.formInput}`}
              type="text"
              name="ISBN"
              value={newBook.ISBN}
              onChange={handleInputChange}
              placeholder="ISBN"
              required
            />
          </div>
        </div>
        <div className="grid justify-items-end">
          <button className={`${styles.button} w-1/6 mb-10`} onClick={handleAddBook}>
            Add Book
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddBook;
