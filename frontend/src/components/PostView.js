import "./Post.css";
import React, { Component } from "react";
import axios from "axios";

// Component to house each post. Will get the post data from
// django and then the data will be mapped to a post in the wall component

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      owned: false,
      liked: false,
    };
  }

  componentDidMount() {
    const postID = this.props.match.params.postID;

    axios
      .get(`api/posts/${postID}`)
      .then((res) => this.setState({ post: res.data }))
      .catch((err) => console.log(err));
  }

  like = (state) => {
    //Adds like if you haven't liked it yet, removes like if you have already liked it.
    if (!this.state.liked) {
      this.state.post.likes += 1;
      this.state.liked = true;
    } else {
      this.state.post.likes -= 1;
      this.state.liked = false;
    }

    const postID = this.props.match.params.postID;

    axios({
      method: "PUT",
      url: `api/posts/${postID}`,
      data: this.state.post,
    })
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = (event) => {
    const postID = this.props.match.params.postID;
    event.preventDefault();

    if (window.confirm("Are you sure you wish to delete this item?")) {
      axios
        .delete(`api/posts/${postID}`)
        .then((res) => {
          var succ = document.getElementById("success-alert");
          succ.style.display = "block";
          succ.style.opacity = "1";
          //Then take them back to the main page
          setTimeout(() => {
            this.props.history.push("/");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          var fail = document.getElementById("fail-alert");
          fail.style.display = "block";
          fail.style.opacity = "1";
          //Then take them back to the main page
          setTimeout(() => {
            this.props.history.push("/");
          }, 1500);
        });
    }
  };

  render() {
    let deleteButton = "";
    if (this.state.post.poster == localStorage.getItem("user")) {
      deleteButton = (
        <button className="my-button" onClick={this.handleDelete}>
          Delete Post
        </button>
      );
    }

    return (
      <div className="container centered">
        <div id="post-container">
          {/* <div class="profile-img"></div> */}
          <h1>{this.state.post.title}</h1>
          <div className="description">{this.state.post.content}</div>
          <footer>
            <div className="likes">
              <p>
                <button onClick={this.like}>
                  <i className="fa fa-heart heart"></i>
                </button>
              </p>
              <p>{this.state.post.likes}</p>
            </div>
            <div className="projects">
              <p>Poster:</p>
              <p>{this.state.post.poster}</p>
            </div>
          </footer>
        </div>
        <div>{deleteButton}</div>
        <div class="alert alert-success my-success" role="alert" id="success-alert">
          Success! Your post has been deleted !
        </div>
        <div class="alert alert-danger my-fail" role="alert" id="fail-alert">
          Error! Your post has not been deleted.
        </div>
      </div>
    );
  }
}
