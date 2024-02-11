import { useState } from "react";
import { BookList, AddBook, Navbar, Home, BookDetails } from "./components";
import "./index.css";
import styles from "./style";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook.ops[0]]);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <Router>
        <Routes>
          <Route path="/get-book/:id" element={<BookDetails />} />
        </Routes>

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Home />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <BookList />
            <AddBook onAddBook={handleAddBook} />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
