import React from "react";
import MoveOption from './MoveOption';

const  Book = ({book, moveBook}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks
                ? book.imageLinks.thumbnail
                : "/icons/Book-Placeholder.png"
            })`,
          }}
        />
        <MoveOption book={book} value={book.shelf} moveBook={moveBook} />
      </div>
      
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(", ") : "Unknown Author"}
      </div>
    </div>
  );
}
export default Book;
