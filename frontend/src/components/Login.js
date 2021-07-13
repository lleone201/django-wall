import "./Login.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "login",
      username: "",
      email: "",
      password: "",
      password1: "",
      password2: "",
    };

    //Have to bind this function here so that it will have access to the component's state
    // this.toggleState = this.toggleState.bind(this);
  }

  //Toggles the state of the login pane between register and sign in
  toggleState = () => {
    if (this.state.type === "login") {
      this.setState({ type: "register" });
    } else {
      this.setState({ type: "login" });
    }
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();

    this.props.onAuth(this.state.username, this.state.password);
    document.getElementById("login-form").reset();
  };

  handleRegisterSubmit = (event) => {
    event.preventDefault();

    this.props.onReg(this.state.username, this.state.email, this.state.password1, this.state.password2);
    document.getElementById("login-form").reset();
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleP1Change = (event) => {
    this.setState({ password1: event.target.value });
  };

  handleP2Change = (event) => {
    this.setState({ password2: event.target.value });
  };

  render() {
    if (this.state.type === "login") {
      return (
        <form onSubmit={this.handleLoginSubmit} className="login" id="login-form">
          <h3 className="top-gap">Sign In</h3>
          <div className="form-group">
            <input type="username" className="form-control" placeholder="Enter Username" onChange={this.handleUserNameChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Enter password" onChange={this.handlePassChange} />
          </div>
          <button type="submit" className="btn btn-primary top-gap bot-gap my-button">
            Submit
          </button>
          <p className="forgot-password text-right">
            Need to{" "}
            <button onClick={this.toggleState} id="sign-in" className="button-link">
              Register?
            </button>
          </p>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleRegisterSubmit} className="login" id="reg-form">
          <h3>Register</h3>
          <div className="form-group">
            {/* <label>First name</label> */}
            <input type="text" className="form-control" placeholder="Enter Username" onChange={this.handleUserNameChange} />
          </div>

          <div className="form-group">
            {/* <label>Email address</label> */}
            <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleEmailChange} />
          </div>

          <div className="form-group">
            {/* <label>Password</label> */}
            <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleP1Change} />
          </div>

          <div className="form-group">
            {/* <label>Password</label> */}
            <input type="password" className="form-control" placeholder="Re-Enter password" onChange={this.handleP2Change} />
          </div>

          <button type="submit" className="btn btn-primary top-gap my-button">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered?{" "}
            <button onClick={this.toggleState} id="sign-in" className="button-link">
              Sign in
            </button>
          </p>
        </form>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
    onReg: (username, email, password1, password2) => dispatch(actions.authRegister(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
