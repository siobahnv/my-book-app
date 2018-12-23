import React, { Component } from 'react';
import '../static/App.css';

import AuthMenu from './AuthMenu';
import BackButton from './ButtonBackToMain';
import SaveButton from './ButtonSave';

class SearchListComponent extends Component {
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

        fetch('http://localhost:5000/createBookList', {
            credentials: 'include',
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => this.setState({ books: data, isLoading: false }))
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    render() {
        const { books, error, isLoading } = this.state;
        const listBooks = books.map((b) => <li key={b.book_id}>{b.title} <SaveButton title={b.title} refreshBooklist={this.refresh}/></li>);
        // const listBooks = books

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        if (books.length === 0) {
            return (
                <div className="SearchResults">
                    <div className="Nav">
                        <AuthMenu/>
                    </div>
                    <div className="Booklist">
                        <p>You have zero books in your list.</p>
                    </div>
                    <BackButton/>
                </div>
            );
        }

        return (
            <div className="SearchResults">
                <div className="Nav">
                    <AuthMenu/>
                </div>
                <div className="Booklist">
                    <p>List by Title</p>
                    {listBooks}
                </div>
                <BackButton/>
            </div>
        );
    }
}

export default SearchListComponent;