import { useState } from "react";
import { BookList, AddBook, Navbar, Home } from "./components";
import "./index.css";
import styles from "./style";

const App = () => {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook.ops[0]]);
  };

  return (
    <div className='bg-primary w-full overflow-hidden'>
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
    </div>
  );
};

export default App;
