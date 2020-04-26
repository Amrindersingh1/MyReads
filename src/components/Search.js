import { Link } from "react-router-dom";
import React, { Component } from "react";
import Book from './Book';

export default class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ searchTerm: query });
    this.props.searchBooks(query);
  };

  render() {
    const {moveBook} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchTerm}
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
                {this.props.books.map(book => <li key={book.id}><Book book={book} moveBook={moveBook}/></li>)}
          </ol>
        </div>
      </div>
    );
  }
}
