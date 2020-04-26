import React from "react";
import * as BooksAPI from './BooksAPI'
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import logo from './icons/logo.png';

class BooksApp extends React.Component {
  state = {
    mybooks : [],
    currentBooks : [],
    wantToBooks : [],
    readBooks : [],
    error : false
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        console.log(books)
        var crBooks = books.filter(book => book.shelf==="currentlyReading");
        var wanttoBooks = books.filter(book => book.shelf==="wantToRead");
        var readBooks = books.filter(book => book.shelf==="read");

        this.setState({ currentBooks: crBooks, wantToBooks:  wanttoBooks, readBooks: readBooks});
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  render() {
    const { currentBooks, wantToBooks, readBooks, error } = this.state;
    if (error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <Router>
        <div className="app">
          <header>
            <img id="logoImage" src={logo}/>
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
            <Link to="/Search"><button>Add a book</button></Link>
          </div>

          <hr />

          <Switch>
            <Route exact path="/">
              <BookShelf books={currentBooks} />
            </Route>
            <Route path="/WanttoRead">
              <BookShelf books={wantToBooks} />
            </Route>
            <Route path="/Read">
              <BookShelf books={readBooks} />
            </Route>
            <Route path="/Search">
              <Search />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
