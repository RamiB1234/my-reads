import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// UI Components:
import Shelf from './Shelf'

class BookList extends Component{
    render(){
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={this.props.books} 
                shelf='currentlyReading' 
                shelfFriendlyName='Currently Reading'
                moveBookCallback={this.props.moveBookCallback} />

                <Shelf books={this.props.books} 
                shelf='wantToRead'
                shelfFriendlyName='Want to Read'
                moveBookCallback={this.props.moveBookCallback} />

                <Shelf books={this.props.books}
                 shelf='read' 
                 shelfFriendlyName='Read'
                moveBookCallback={this.props.moveBookCallback} />
              </div>
            </div>
            <div className="open-search">
            <Link to ='/search' >Search</Link>
            </div>
          </div>
        )
    }
}

export default BookList