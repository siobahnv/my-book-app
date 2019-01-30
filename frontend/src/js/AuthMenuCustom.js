// https://react-bootstrap.github.io/components/dropdowns/

import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import '../static/App.css';

import { loginUser, logoutUser } from './actions'
// import { fetchBooklist } from './actions';

import { Link } from "react-router-dom";
import { Button, ButtonGroup, ButtonToolbar, Dropdown } from "react-bootstrap";
import { FormGroup, FormControl, InputGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Panel } from "react-bootstrap";

class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    render() {
        return (
        <a href="" onClick={this.handleClick}>
            {this.props.children}
        </a>
        );
    }
}

class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    // focusNext() {
    //     const input = ReactDOM.findDOMNode(this.input);

    //     if (input) {
    //         input.focus();
    //     }
    // }

    render() {
        const { children } = this.props;
        const { value } = this.state;

        return (
            <div className="dropdown-menu" style={{ padding: '' }}>
                {/* <FormControl
                    ref={c => {
                        this.input = c;
                    }}
                    type="text"
                    placeholder="Type to filter..."
                    onChange={this.handleChange}
                    value={value}
                /> */}
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child => !value.trim() || child.props.children.indexOf(value) !== -1
                    )}
                </ul>
            </div>
        );
    }
}

class AuthMenuCustom extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        // email: '',
        password: '',
        // loggedIn: false
      }
  
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      // this.refresh = this.refresh.bind(this);
      this.handleChange = this.handleChange.bind(this)
    }

    handleLogin(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        console.log("hitting here?");

        fetch('http://localhost:5000/login', {
        credentials: 'include',
        method: 'POST',
        body: data,
        }) 
        .then(data => this.props.loginUser(data))
        .then(() => this.props.loggedInCallback())
        // .then(() => this.props.fetchBooklist())    
        // .then(() => this.refresh());   
    }

    handleLogout(e) {
        e.preventDefault();

        fetch('http://localhost:5000/logout', {
            credentials: 'include'
        }) 
        .then(() => this.props.logoutUser()) 
        // .then(() => this.props.fetchBooklist())   
        // .then(() => this.refresh());   
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(this.props.username + " " + this.props.password);
        console.log(this.state.username, this.state.password);
    }

    render(){

        // if (this.state.loggedIn) {
        if (this.props.loggedIn) {
            return (
            <div className="Nav">
                <div className="profile">
                <Col xs={12}>
                    {/* <Image src={'https://via.placeholder.com/30'} alt="ProfilePic" className="img-profile" responsive/> */}
                    {/* {this.state.username} */}
                    <Button className="logoutbutton" onClick={this.handleLogout}>Logout</Button>
                </Col>
                </div>
            </div>
            );
        }

        return (
            <Dropdown id="dropdown-custom-menu">
                <CustomToggle bsRole="toggle"><Button className="loginbutton" bsStyle="primary" type="submit">Toggle Login</Button></CustomToggle>

                <CustomMenu bsRole="menu">
                    <Panel className="LoginPanel">
                        <Panel.Body>
                            <ButtonToolbar>
                                <form onSubmit={this.handleLogin}>
                                    <Col xs={12}>
                                    <FormGroup>
                                        <InputGroup>
                                            <FormControl type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                                            <FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                                        </InputGroup>
                                        <ButtonGroup>
                                            <Button className="btn-primary-dark" type="submit">Sign On</Button>
                                            <Link to={{ pathname: '/register', state: { username: this.state.username, password: this.state.password } }}><Button>Register</Button></Link>
                                        </ButtonGroup>
                                    </FormGroup>
                                    </Col>
                                </form>
                            </ButtonToolbar>
                        </Panel.Body>
                    </Panel>
                </CustomMenu>

            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        // username: state.username,
        // password: state.password
        // booklist: state.booklist
    }
  }
  
  // function mapDispatchToProps(dispatch) {
  //   return {
  //     actions: {
  //       loginUser: bindActionCreators(loginUser, dispatch),
  //       logoutUser: bindActionCreators(logoutUser, dispatch)
  //     }
  //   };
  // }
  
  const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()), 
    // fetchBooklist: () => dispatch(fetchBooklist()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuthMenuCustom)