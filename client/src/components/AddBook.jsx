// File: src/components/AddBook.js
import { useState } from 'react';

const AddBook = (onAddBook) => {
    const [newBook, setNewBook] = useState({ title: '', author: '', publication_date: Date(), genre: '', ISBN: '' });

    const handleInputChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    const handleAddBook = () => {
        fetch('http://localhost:3000/upload-book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
            .then((response) => response.json())
            .then((data) => {
                onAddBook(data);
                setNewBook({ title: '', author: '' });
            })
            .catch((error) => console.error('Error adding book:', error));
    };

    return (
        <div>
            <h2>Add Book</h2>
            <label>
                Title:
                <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />
            </label>
            <label>
                Author:
                <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />
            </label>
            <label>
                Publication Date
                <input type="date" name="Publication Date" value={newBook.publication_date} onChange={handleInputChange} />
            </label>
            <label>
                Genre
                <input type="text" name="Genre" value={newBook.genre} onChange={handleInputChange} />
            </label>
            <label>
                ISBN
                <input type="text" name="ISBN" value={newBook.ISBN} onChange={handleInputChange} />
            </label>
            <button onClick={handleAddBook}>Add Book</button>
        </div>
    );
};

export default AddBook;
