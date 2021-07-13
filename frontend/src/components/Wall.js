import "./Wall.css";
import Post from "./Post";
import Login from "./Login";
import React, { Component } from "react";
import axios from "axios";

export default class Wall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
    };
  }

  componentDidMount() {
    this.postRefresh();
  }

  postRefresh = () => {
    axios
      .get("api/posts/")
      .then((res) => this.setState({ postList: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="wall">
        <div className="fluid-container">
          <div className="row">
            <div id="create-post" className="col-lg-4 login-section">
              <Login></Login>
            </div>
            <div className="col-lg-4"></div>
            <div className="col-lg-8 post-section">
              {this.state.postList.map((post, index) => (
                <Post key={post.id} id={post.id} title={post.title} content={post.content} likes={post.likes} poster={post.poster}></Post>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
