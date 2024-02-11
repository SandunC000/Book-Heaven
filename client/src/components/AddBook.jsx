// File: src/components/AddBook.js
import { useState } from "react";
import styles from "../style";
import axios from "axios";

const AddBook = (onAddBook) => {
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        publication_date: Date(),
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
        <section id="addBook">
            <h2 className={`${styles.heading1}`}>
                Add a New Book
            </h2>

            <div className="flex flex-col w-full flex justify-between items-center ">
                <div>
                    <label className={`${styles.label}`}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className={`${styles.label}`}>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className={`${styles.label}`}>Publication Date</label>
                    <input
                        type="date"
                        name="publication_date"
                        value={newBook.publication_date}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label className={`${styles.label}`}>Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={newBook.genre}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className={`${styles.label}`}>ISBN</label>
                    <input
                        type="text"
                        name="ISBN"
                        value={newBook.ISBN}
                        onChange={handleInputChange}
                    />
                </div>

                <button className={`${styles.button}`} onClick={handleAddBook}>
                    Add Book
                </button>
            </div>
        </section>
    );
};

export default AddBook;
