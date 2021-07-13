import "./Post.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Component to house each post. Will get the post data from
// django and then the data will be mapped to a post in the wall component

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.likes,
    };
  }

  like = (state) => {
    this.setState({ likes: this.state.likes + 1 });
  };

  render() {
    return (
      <div id="post-container">
        {/* <div class="profile-img"></div> */}
        <Link to={`posts/${this.props.id}`}>{this.props.title}</Link>
        <div className="description">{this.props.content}</div>
        <footer>
          <div className="likes">
            <p>
              <button onClick={this.like}>
                <i className="fa fa-heart heart"></i>
              </button>
            </p>
            <p>{this.state.likes}</p>
          </div>
          <div className="projects">
            <p>Poster:</p>
            <p>{this.props.poster}</p>
          </div>
        </footer>
      </div>
    );
  }
}
