import React, { Component } from 'react';
import '../static/App.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoading: false,
            newUser: null
        };

        this.handleRegister = this.handleRegister.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderHomepage = this.renderHomepage.bind(this)
    }

    handleRegister(e) {
        this.setState({ isLoading: true});
        this.setState({ newUser: "test" });

        const data = new FormData(e.target);

        fetch('http://localhost:5000/register', {
            credentials: 'include',
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    renderForm() {
        return (
            <div className="Register">
                <form method="POST" action="http://localhost:5000/register" id="userlogin" onSubmit={this.handleRegister}>
                <input type="text" name="username" placeholder="username"></input>
                <input type="text" name="email" placeholder="email"></input>
                <input type="text" name="password" placeholder="password"></input>
                <button type="button">Register</button>
                </form>
            </div>
        );
    }

    renderHomepage() {
        fetch('http://localhost:5000/', {
            credentials: 'include'
        })
    }

    render() {
        const { error, isLoading } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div className="Signup">
              {this.state.newUser === null
                ? this.renderForm()
                : this.renderHomepage()}
            </div>
        );
    }
}

export default Register;