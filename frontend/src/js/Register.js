import React, { Component } from 'react';
import '../static/App.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoading: false,
        };

        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister(e) {
        const data = new FormData(e.target);

        fetch('http://localhost:5000/register', {
            credentials: 'include',
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(() => {
            this.props.history.goBack();
        })
        .catch((error) => {this.setState({isLoading: true, error})});
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
            <div className="RegisterForm">
                <form id="userregister" name="register" className="myform" onSubmit={this.handleRegister}>
                    <input type="text" name="username" placeholder="username"></input>
                    <input type="text" name="email" placeholder="email"></input>
                    <input type="text" name="password" placeholder="password"></input>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;