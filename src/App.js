import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import logo from "./icons/logo.png";

class BooksApp extends React.Component {
  state = {
    mybooks: [],
    currentBooks: [],
    wantToBooks: [],
    readBooks: [],
    searchedBooks: [],
    error: false,
  };

  constructor(props) {
    super(props);
    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        console.log(books);
        var crBooks = books.filter((book) => book.shelf === "currentlyReading");
        var wanttoBooks = books.filter((book) => book.shelf === "wantToRead");
        var readBooks = books.filter((book) => book.shelf === "read");

        this.setState({
          currentBooks: crBooks,
          wantToBooks: wanttoBooks,
          readBooks: readBooks,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  moveBook(book, shelf) {
    console.log("moved");
    BooksAPI.update(book, shelf).catch((err) => {
      console.log(err);
      this.setState({ error: true });
    });

    this.setState((prevState) => ({
      currentBooks: prevState.currentBooks.filter((bk) => bk.id !== book.id),
      wantToBooks: prevState.wantToBooks.filter((bk) => bk.id !== book.id),
      readBooks: prevState.readBooks.filter((bk) => bk.id !== book.id),
    }));

    if (shelf === "currentlyReading") {
      book.shelf = shelf;
      this.setState((prevState) => ({
        currentBooks: [...prevState.currentBooks, book],
      }));
    } else if (shelf === "wantToRead") {
      book.shelf = shelf;
      this.setState((prevState) => ({
        wantToBooks: [...prevState.wantToBooks, book],
      }));
    } else if (shelf === "read") {
      book.shelf = shelf;
      this.setState((prevState) => ({
        readBooks: [...prevState.readBooks, book],
      }));
    }
  }

  searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState({ searchedBooks: [] });
        } else {
          this.setState({ searchedBooks: books });
        }
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  resetSearch = () => {
    this.setState({ searchedBooks: [] });
  };

  render() {
    const {
      currentBooks,
      wantToBooks,
      readBooks,
      searchedBooks,
      error,
    } = this.state;

    if (error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <Router>
        <div className="app">
          <header>
            <img id="logoImage" src={logo} />
            <nav>
              <ul>
                <li>
                  <Link to="/">Currently Reading</Link>
                </li>
                <li>
                  <Link to="/WanttoRead">Want to Read</Link>
                </li>
                <li>
                  <Link to="/Read">Read</Link>
                </li>
              </ul>
            </nav>
          </header>

          <div className="open-search">
            <Link to="/Search">
              <button>Add a book</button>
            </Link>
          </div>

          <hr />

          <Switch>
            <Route exact path="/">
              <BookShelf books={currentBooks} moveBook={this.moveBook} />
            </Route>
            <Route path="/WanttoRead">
              <BookShelf books={wantToBooks} moveBook={this.moveBook} />
            </Route>
            <Route path="/Read">
              <BookShelf books={readBooks} moveBook={this.moveBook} />
            </Route>
            <Route path="/Search">
              <Search
                searchBooks={this.searchBooks}
                moveBook={this.moveBook}
                books={searchedBooks}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
