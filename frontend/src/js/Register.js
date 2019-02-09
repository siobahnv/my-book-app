import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
import '../static/Register.css';
// import { fetchBooklist } from './actions';
import { loginUser } from './actions'
import BackButton from './ButtonBackToMain';
import { Button, ButtonGroup } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";
import { MY_URL } from './secrets';

class Register extends Component {
    constructor(props) {
        super(props);
        // const {username, password} = this.props.location.state

        this.state = {
            username: '',
            email: '',
            password: '',
            error: null,
            isLoading: false,
            showRegFailMessage: false
        };

        this.handleRegister = this.handleRegister.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleRegister(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        console.log("What about here?");

        fetch(MY_URL + '/register', {
            credentials: 'include',
            method: 'POST',
            body: data
        })
        .then(response => {
            response.json()
            if (response.status === 400) {
                this.setState({ showRegFailMessage: true });
            } else {
                this.props.loginUser(response);
                this.setState({ showRegFailMessage: true });
                this.props.history.goBack();
            }
        })
        // .then(data => this.props.loginUser(data))
        // .then(() => this.props.loggedInCallback())
        // .then(() => { this.props.history.goBack();})
        // .catch((error) => {this.setState({isLoading: true, error})});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.username + " " + this.state.password);
      }

    render() {
        // const { error, isLoading } = this.state; 

        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }

        // if (isLoading) {
        //     return <p>Loading...</p>
        // }

        let registerMenuMessage = "Please register."
        if (this.state.showRegFailMessage === true) {
            registerMenuMessage = "Register unsuccessful, user already exists. Please try again."
        }

        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="RegisterForm signup-screen center">
                                <div className="App">{registerMenuMessage}</div>
                                <form onSubmit={this.handleRegister}>
                                    <FormGroup controlId="formBasicUsername">
                                        <FormControl type="text" name="username" placeholder="Username" required value={this.state.username} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup controlId="formBasicEmail">
                                        <FormControl type="email" name="email" placeholder="Email" required value={this.state.email} onChange={this.handleChange}/>
                                    </FormGroup>
                                    <FormGroup controlId="formBasicPassword">
                                        <FormControl type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.handleChange} />
                                    </FormGroup>
                                    <ButtonGroup>
                                        <Button type="submit">Register</Button>
                                        <BackButton/>
                                    </ButtonGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // booklist: state.booklist,
        loggedIn: state.loggedIn,
        username: state.username,
        password: state.password
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser:(creds) => dispatch(loginUser(creds)),
    // fetchBooklist: (books) => dispatch(fetchBooklist(books))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)