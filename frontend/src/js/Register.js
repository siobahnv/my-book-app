import React, { Component } from 'react';
import { connect } from "react-redux";
import '../static/App.css';
// import { fetchBooklist } from './actions';
import { loginUser } from './actions'
import BackButton from './ButtonBackToMain';


class Register extends Component {
    constructor(props) {
        super(props);
        // const {username, password} = this.props.location.state

        // this.state = {
        //     username: username,
        //     password: password,
        //     error: null,
        //     isLoading: false,
        // };

        this.handleRegister = this.handleRegister.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleRegister(e) {
        const data = new FormData(e.target);

        fetch('http://localhost:5000/register', {
            credentials: 'include',
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => this.props.loginUser(data))
        // .then(() => this.props.loggedInCallback())
        .then(() => { this.props.history.goBack();})
        // .catch((error) => {this.setState({isLoading: true, error})});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.props.username + " " + this.props.password);
      }

    render() {
        // const { error, isLoading } = this.state; 

        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }

        // if (isLoading) {
        //     return <p>Loading...</p>
        // }

        return (
            <div className="RegisterForm">
                <form id="userregister" name="register" className="myform" onSubmit={this.handleRegister}>
                    <input type="text" name="username" placeholder="username" required value={this.props.username} onChange={this.handleChange}></input>
                    <input type="text" name="email" placeholder="email" required></input>
                    <input type="text" name="password" placeholder="password" required value={this.props.password} onChange={this.handleChange}></input>
                    <input type="text" name="confirmPassword" placeholder="confirm password" required value={this.props.password} onChange={this.handleChange}></input>
                    <button>Register</button>
                    <BackButton/>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);