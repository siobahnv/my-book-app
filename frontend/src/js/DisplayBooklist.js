import React, { Component } from 'react';
import '../static/App.css';

class BooklistComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          books: [],
          isLoading: false
        }
      }
    
      componentDidMount() {
        this.setState({ isLoading: true});
    
        fetch('http://localhost:5000/booklist')
        .then(response => response.json())
        .then(data => this.setState({ books: data, isLoading: false }));
      }

  render() {
    const { books, isLoading } = this.state;
    const listBooks = books.map((b) => <li key={b.book_id}>{b.title} <i class="fa fa-trash" aria-hidden="true"></i></li>);

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (books===[]) {
        return <p>You have zero books in your list.</p>
    }

    return (
      <div className="Booklist">
        <p>Title</p>
        {listBooks}
      </div>
    );
  }
}

export default BooklistComponent;