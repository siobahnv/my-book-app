import React, { Component } from 'react';
import '../static/App.css';

import TrashButton from './ButtonTrash';

class BooklistComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            error: null,
            isLoading: false
        };

        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
      this.refresh()
    }

    refresh() {
        this.setState({ isLoading: true});

        fetch('http://localhost:5000/booklist', {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.setState({ books: data, isLoading: false }))
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    render() {
        const { books, error, isLoading } = this.state;
        // const listBooks = books.map((b) => <li key={b.book_id}>{b.title} <TrashButton book_id={b.book_id} refreshBooklist={this.refresh}/></li>);
        const listBooks = books.map((b) => <li>{b.title} <TrashButton book_title={b.book_title} refreshBooklist={this.refresh}/></li>);

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        if (books.length === 0) {
            return (
                <div className="Booklist">
                    <p>You have zero books in your list.</p>
                </div>
            );
        }

        return (
            <div className="Booklist">
                <p>Best List Evar</p>
                {listBooks}
            </div>
        );
    }
}

export default BooklistComponent;