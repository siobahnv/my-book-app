import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';

import AuthMenu from './AuthMenu';
import BackButton from './ButtonBackToMain';
import SaveButton from './ButtonSave';
import { fetchBooks } from './actions';

class SearchListComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // books: [],
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
        .then(data => this.props.fetchBooks(data))
        // .then(data => this.setState({ books: data, isLoading: false }))
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    handleLogIn(name, isLoggedIn) {
        this.setState( { 
            username : name,
            loggedIn : isLoggedIn
        });
    }

    render() {
        // const { books, error, isLoading } = this.state;
        const { bookresults } = this.props;
        const listBooks = bookresults.map((b) => <li key={b.book_id}>{b.title} <SaveButton title={b.title} refreshBooklist={this.refresh}/></li>);
        
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }

        // if (isLoading) {
        //     return <p>Loading...</p>
        // }

        if (bookresults.length === 0) {
            return (
                <div className="SearchResults">
                    <div className="Nav">
                        <AuthMenu authenticating={this.handleLogIn} />
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
                    <AuthMenu authenticating={this.handleLogIn} />
                </div>
                <div className="Booklist">
                    {/* <p>List by {this.props.title}</p> */}
                    {listBooks}
                </div>
                <BackButton/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookresults: state.bookresults
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchBooks: (books) => dispatch(fetchBooks(books))
  })

export default connect(mapStateToProps, mapDispatchToProps)(SearchListComponent)