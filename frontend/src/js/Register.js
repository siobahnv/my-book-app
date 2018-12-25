import React, { Component } from 'react';
import '../static/App.css';

class Register extends Component {
    constructor(props) {
        super(props);

        const {username, password} = this.props.location.state

        this.state = {
            username: username,
            password: password,
            error: null,
            isLoading: false,
        };

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
        .then(() => {
            this.props.history.goBack();
        })
        .catch((error) => {this.setState({isLoading: true, error})});
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.username + " " + this.state.password);
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
                    <input type="text" name="username" placeholder="username" required value={this.state.username} onChange={this.handleChange}></input>
                    <input type="text" name="email" placeholder="email" required></input>
                    <input type="text" name="password" placeholder="password" required value={this.state.password} onChange={this.handleChange}></input>
                    <input type="text" name="confirmPassword" placeholder="confirm password" required value={this.state.password} onChange={this.handleChange}></input>
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default Register;