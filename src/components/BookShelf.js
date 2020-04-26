import React from "react";
import Book from './Book';

const  BookShelf = ({books, moveBook}) => {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid" >
                { books.map(book => <li key={book.id}><Book book={book} moveBook={moveBook}/></li>) }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookShelf;
