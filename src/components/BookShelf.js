import React from "react";
import Book from './Book';

function BookShelf({books}) {
  return (
    <div className="list-books">
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid" >
                { books.map(book => <li key={book.id}><Book book={book}/></li>) }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BookShelf;
