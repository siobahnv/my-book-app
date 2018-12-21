import React, { Component } from 'react';
import '../static/App.css';

import TrashButton from './TrashButton';

class BooklistComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            error: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true});

        fetch('http://localhost:5000/booklist')
        .then(response => response.json())
        .then(data => this.setState({ books: data, isLoading: false }))
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    render() {
        const { books, error, isLoading } = this.state;
        const listBooks = books.map((b) => <li key={b.book_id}>{b.title} <TrashButton book_id={b.book_id}/></li>);

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        if (books===[]) {
            return (
                <div className="Booklist">
                    <p>You have zero books in your list.</p>
                </div>
            );
        }

        return (
            <div className="Booklist">
                <p>List by Title</p>
                {listBooks}
            </div>
        );
    }
}

export default BooklistComponent;