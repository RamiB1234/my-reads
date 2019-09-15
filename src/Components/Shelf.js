import React, { Component } from "react";

// Components:
import Book from "./Book";

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfFriendlyName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .map(book => {
                return (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      title={book.title}
                      authors={book.authors}
                      imgUrl={book.imgUrl}
                      shelf = {book.shelf}
                      moveBookCallback={this.props.moveBookCallback}
                    />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
