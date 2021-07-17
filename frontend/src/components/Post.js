import "./Post.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Wall from "./Wall";

// Component to house each post. Will get the post data from
// django and then the data will be mapped to a post in the wall component

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.likes,
      expanded: false,
      updated: false,
    };
  }

  like = (state) => {
    //Get data from whatever post was clicked
    const postID = this.props.id;

    //This was the only way that I could figure out to get the number to update when the post was liked.
    var temp = JSON.parse(localStorage.getItem("likedPosts"));

    if (!temp) {
      //If the user is not logged in just don't do anything.
      return;
    }
    //In the case that it's already been liked, unlike it.
    if (temp.includes(postID)) {
      axios
        .get(`posts/api/posts/${postID}`)
        .then((res) => {
          //Increase the like count and then update the record
          let post = res.data;
          post.likes -= 1;

          axios({
            method: "PUT",
            url: `posts/api/posts/${postID}`,
            data: post,
          })
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
      //Remove the unliked element from the array
      const index = temp.indexOf(postID);
      temp.splice(index, 1);
      console.log(temp);
      localStorage.setItem("likedPosts", JSON.stringify(temp));
    } else {
      temp.push(postID);
      console.log(temp);

      localStorage.setItem("likedPosts", JSON.stringify(temp));

      axios
        .get(`posts/api/posts/${postID}`)
        .then((res) => {
          //Increase the like count and then update the record
          let post = res.data;
          post.likes += 1;

          axios({
            method: "PUT",
            url: `posts/api/posts/${postID}`,
            data: post,
          })
            .then((res) => {})
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
    setTimeout(() => {
      window.location.reload(false);
    }, 10);
  };

  handleExpand = (event) => {
    var el = document.getElementById("content");
    el.innerHTML = this.props.content;
    el = document.getElementById("elipses");
    el.style.visibility = "hidden";
  };

  render() {
    let postPreview = this.props.content;
    let elipses = "";
    if (postPreview.length > 400) {
      postPreview = <span id="content">{postPreview.substr(0, 400)}</span>;
      elipses = (
        <span id="elipses" onClick={this.handleExpand}>
          {" "}
          ...
        </span>
      );
    }

    return (
      <div id="post-container">
        {/* <div class="profile-img"></div> */}
        <Link className="link" to={`posts/${this.props.id}`}>
          {this.props.title}
        </Link>
        <div className="description">
          {postPreview}
          {elipses}
        </div>
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
