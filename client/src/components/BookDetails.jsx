import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get-book/${id}`);
        setBook(response.data[0]);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div className="text-white">
      {book ? (
        <div>
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

export default BookDetails;
