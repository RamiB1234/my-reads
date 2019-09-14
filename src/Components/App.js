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

  moveBook = (title, newShelf) =>{

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
    });
  }
  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
            <BookList books= {this.state.books} moveBookCallback = {this.moveBook} />
      )} />
      <Route path='/search' render={() => (
            <Search />
      )} />
      </div>
    )
  }
}

export default BooksApp