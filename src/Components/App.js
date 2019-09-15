import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './utilities/BooksAPI'
import '../App.css'

// UI Components:
import BookList from './BookList'
import Search from './Search' 


class BooksApp extends React.Component {
  state = {
    books: []
  }

  moveBook = (id, newShelf) =>{

    let currentBooks = this.state.books;

    // Find index of book object using findIndex method:    
    const bookIndex = currentBooks.findIndex((obj => obj.id === id));

    // Update book's shelf:
    currentBooks[bookIndex].shelf = newShelf;

    // Update shelf on server:

    BooksAPI.update(currentBooks[bookIndex] , newShelf);
    // Update status:
    this.setState({
      books : currentBooks
    })
  }

  componentDidMount(){
    this.loadBooksFromServer();
  }

  loadBooksFromServer = () =>{
    //Reset book state:
    this.setState({
      books: []
    })
    BooksAPI.getAll().then(result =>{
      result.forEach( (b) =>{
        const newBook = {
          id : b.id,
          title: b.title,
          authors : b.authors,
          shelf : b.shelf,
          imgUrl : b.imageLinks == null ? 
          /* showing placeholder image for results that has no cover */
          './images/noImage.jpg' : b.imageLinks.thumbnail
        }
        this.setState((prevState)=>({
          books : prevState.books.concat(newBook)
        }))
      })
    });
  }
  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
            <BookList books= {this.state.books} moveBookCallback = {this.moveBook} />
      )} />
      <Route path='/search' render={() => (
            <Search
            moveBookCallback = {this.moveBook}
            currentBooks={this.state.books}
            loadBooksHandler={this.loadBooksFromServer} />
      )} />
      </div>
    )
  }
}

export default BooksApp