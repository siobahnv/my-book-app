import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
import AuthMenuCustom from './AuthMenuCustom';
import BackButton from './ButtonBackToMain';
import SaveButton from './ButtonSave';
import { fetchBooks } from './actions';
import { Panel } from "react-bootstrap";
import { MY_URL } from './secrets';

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

        fetch(MY_URL + '/createBookList/' + this.props.title, {
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
                <div className="App">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <AuthMenuCustom authenticating={this.handleLogIn} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="App-body">
                                    <div className="Booklist">
                                        <Panel>
                                            <Panel.Body>There are zero results.</Panel.Body>
                                        </Panel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <BackButton/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <AuthMenuCustom authenticating={this.handleLogIn} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="App-body">
                                <div className="Booklist">
                                    <Panel>
                                        <Panel.Heading>List by {this.props.title}</Panel.Heading>
                                        <Panel.Body>{listBooks}</Panel.Body>
                                    </Panel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <BackButton/>
                        </div>
                    </div>
                </div>
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