import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styles from "../style";

const BookEdit = () => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="bg-primary h-screen">
      {book ? (
        <div className="">
          <h1 className={`${styles.heading2}`}>Edit Book</h1>

          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookEdit;
