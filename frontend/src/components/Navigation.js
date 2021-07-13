import React, { Component } from "react";
import * as actions from "../store/actions/auth";
import { connect } from "react-redux";
import "./Navigation.css";

class Navigation extends Component {
  handleLogout = () => {
    this.props.onLogout();
  };

  render() {
    if (this.props.isAuthenticated == false) {
      return (
        <div>
          <div className="container navbar ">
            <div className="row v-align">
              <div className="col-lg-12 link-menu v-align">
                <ul className="v-align" style={{ marginLeft: "4rem", marginRight: "4rem" }}>
                  <li>
                    <a href="/" style={{ fontSize: "35px" }}>
                      <i class="fa fa-home"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="my-spacer"></div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container navbar ">
            <div className="row v-align">
              <div className="col-lg-12 link-menu v-align">
                <ul className="v-align" style={{ marginLeft: "4rem", marginRight: "4rem" }}>
                  <li>
                    <a href="/" style={{ fontSize: "35px" }}>
                      <i class="fa fa-home"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/">Create Post</a>
                  </li>
                  <li>
                    <a href="/" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="my-spacer"></div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Navigation);
