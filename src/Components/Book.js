import React, {Component} from 'react'

class Book extends Component{
  updateShelf = (e) =>{
    this.props.moveBookCallback(this.props.id, e.target.value);
  }
    render(){
        return(
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.props.imgUrl})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.updateShelf.bind(this)} value={this.props.shelf}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
            <div className="book-authors">{this.props.authors}</div>
          </div>
        )
    }
}

export default Book