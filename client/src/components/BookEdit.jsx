import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style";

const BookEdit = () => {
  const [editedBook, setEditedBook] = useState({
    title: "",
    author: "",
    publicationDate: "",
    genre: "",
    ISBN: "",
    isRead: "",
  });

  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-book/${bookId}`);
        setEditedBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateBook = async () => {
    try {
      await axios.patch(`http://localhost:3000/update-book/${bookId}`, editedBook);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className={`bg-primary h-screen flex flex-col p-5`}>
      <div>
        <h1 className={`${styles.heading1}`}>Edit Book</h1>

        <form className='w-full flex flex-col'>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full px-3'>
              <label className={`${styles.formLabel}`} name='title'>
                Title
              </label>
              <input
                className={`${styles.formInput}`}
                name='title'
                type='text'
                placeholder='Book Title...'
                value={editedBook.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='w-full px-3'>
              <label className={`${styles.formLabel}`} name='authorName'>
                Author Name
              </label>
              <input
                className={`${styles.formInput}`}
                name='author'
                type='text'
                placeholder='Author Name...'
                value={editedBook.author}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className={`${styles.formLabel}`} name='genre'>
                Genre
              </label>
              <input
                className={`${styles.formInput}`}
                type='text'
                name='genre'
                value={editedBook.genre}
                onChange={handleInputChange}
                placeholder='Genre'
                required
              />
            </div>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className={`${styles.formLabel}`} name='publicationDate'>
                Publication Date
              </label>
              <input
                className={`${styles.formInput}`}
                name='publicationDate'
                type='date'
                value={editedBook.publicationDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
              <label className={`${styles.formLabel}`} name='ISBN'>
                ISBN
              </label>
              <input
                className={`${styles.formInput}`}
                type='text'
                name='ISBN'
                value={editedBook.ISBN}
                onChange={handleInputChange}
                placeholder='ISBN'
                required
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Link to={"/"}>
              <button type='button' className={`${styles.buttonCancel} mb-10 mr-5 px-10`}>
                Cancel
              </button>
              <button
                type='button'
                className={`${styles.button} mb-10 mr-5 px-10`}
                onClick={handleUpdateBook}
              >
                Update Book
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
