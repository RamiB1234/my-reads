import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

// Components:
import BookList from './BookList'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  moveBook = (title, newShelf) =>{
    console.log('y');

    let currentBooks = this.state.books;

    // Find index of book object using findIndex method.    
    const bookIndex = currentBooks.findIndex((obj => obj.title === title));

    // Update book's shelf.
    currentBooks[bookIndex].shelf = newShelf;

    // Update status:
    this.setState({
      books : currentBooks
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then(result =>{
      result.map((b) =>{
        const newBook = {
          id : b.id,
          title: b.title,
          authors : b.authors,
          shelf : b.shelf,
          imgUrl : b.imageLinks.thumbnail
        }
        this.setState((prevState)=>({
          books : prevState.books.concat(newBook)
        }))
      })
      console.log(result);
    });
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookList books={this.state.books} shelf='currentlyReading' moveBookCallback={this.moveBook} />
                <BookList books={this.state.books} shelf='wantToRead' moveBookCallback={this.moveBook} />
                <BookList books={this.state.books} shelf='read'  moveBookCallback={this.moveBook} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp