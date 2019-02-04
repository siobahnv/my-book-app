import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
import { fetchBooklist } from './actions';
import TrashButton from './ButtonTrash';
import { Panel } from "react-bootstrap";
import { MY_URL } from './secrets';

class BooklistComponent extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     books: [],
        //     error: null,
        //     isLoading: false
        // };

        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
      this.refresh()
    }

    refresh() {
        this.setState({ isLoading: true});

        fetch(MY_URL + '/booklist', {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => this.props.fetchBooklist(data))
        // .then(data => this.setState({ books: data, isLoading: false }))
        // .catch((error) => {this.setState({isLoading: true, error})});
    }

    render() {
        // const { books, error, isLoading } = this.state;
        const { booklist } = this.props;

        if (booklist && booklist.length !== 0) {
            const listBooks = booklist.map((b) => <li key={b.book_id}>{b.title} <TrashButton book_id={b.book_id} refreshBooklist={this.refresh}/></li>);

            return (
                <div className="Booklist">
                    <Panel>
                        <Panel.Heading>Best List Evar</Panel.Heading>
                        <Panel.Body>{listBooks}</Panel.Body>
                    </Panel>
                </div>
            );
        }

        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }

        // if (isLoading) {
        //     return <p>Loading...</p>
        // }

        // if (booklist.length === 0) {
        //     return (
        //         <div className="Booklist">
        //             <p>You have zero books in your list.</p>
        //         </div>
        //     );
        // }

        return (
            <div className="Booklist">
                <Panel>
                    <Panel.Body>You have zero books in your list.</Panel.Body>
                </Panel>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        booklist: state.booklist,
        loggedIn: state.loggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchBooklist: (books) => dispatch(fetchBooklist(books))
})

export default connect(mapStateToProps, mapDispatchToProps)(BooklistComponent)