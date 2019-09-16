import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./utilities/BooksAPI";

// UI Components:
import Shelf from "./Shelf";

class Search extends Component {
  state = {
    query: "",
    foundBooks: []
  };

  searchBooks = query => {
    let resultArray = [];
    BooksAPI.search(query).then(result => {
      
      // Only if result is defined and more than 0:
      if (result && result.length > 0) {
        resultArray = result.map(b => ({
          id: b.id,
          title: b.title,
          authors: b.authors,
          shelf: this.getBookLocalShelf(b.id),
          // showing placeholder image for results that has no cover
          imgUrl: b.imageLinks == null ? 
          './images/noImage.jpg'
          : b.imageLinks.thumbnail
        }));
      }
      this.setState(() => ({
        foundBooks: resultArray
      }));
    });
  };

  getBookLocalShelf = bookId => {
    // If book avilable locally, return its shelf, otherwise return 'none'
    const localBook = this.props.currentBooks.filter(b => b.id === bookId);
    if (localBook.length > 0) {
      return localBook[0].shelf;
    } else {
      return "none";
    }
  };

  changeQuery = query => {  
    // Search books:
    this.searchBooks(query)

    // Update query in state
    this.setState(() => ({
      query: query
    }));
  };

  moveBook = (id, newShelf) => {
    let currentBooks = this.state.foundBooks;

    // Find index of book object using findIndex method:
    const bookIndex = currentBooks.findIndex(obj => obj.id === id);

    // Update book's shelf:
    currentBooks[bookIndex].shelf = newShelf;

    // Update shelf on server:

    BooksAPI.update(currentBooks[bookIndex], newShelf);

    // Update status:
    this.setState({
      foundBooks: currentBooks
    });
  };

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
              onClick={() => {
                // Reload books from server when going back to book list:
                this.props.loadBooksHandler();
              }}
            >
              Home
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={event => {
                  this.changeQuery(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="list-books">
          <div className="list-books-content">
            <div>
              {// Only render if there's result:

              this.state.foundBooks.length > 0 && (
                <Shelf
                  books={this.state.foundBooks}
                  shelfFriendlyName="Search Result"
                  moveBookCallback={this.moveBook}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
