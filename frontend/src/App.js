import "./App.css";
import Navigation from "./components/Navigation";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import BaseRouter from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    //Everytime the component mounts it's going to check whether the user is authenticated or not
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className="App">
        <Router {...this.props}>
          <Navigation {...this.props}></Navigation>
          <BaseRouter {...this.props} />

          {/*<Wall {...this.props}></Wall> */}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //If token is not null, then isAuthenticated is True
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
