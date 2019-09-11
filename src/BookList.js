import React, { Component } from "react";

// Components:
import Book from "./Book";

class BookList extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter(book => book.category === this.props.category)
              .map(book => {
                return (
                  <li>
                    <Book
                      title={book.title}
                      authors={book.authors}
                      imgUrl={book.imgUrl}
                      category = {this.props.category}
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

export default BookList;
