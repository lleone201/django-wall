import "./PostCreateView.css";
import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      date: "",
      poster: "",
      likes: 0,
    };
  }

  //Makes sure that the create post page cannot be accessed by someone who isn't logged in.
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
      alert("Must be logged in to access this page");
    }
  }

  handleCreateSubmit = (event) => {
    if (this.state.title != "" && this.state.content != "") {
      event.preventDefault();
      const user = localStorage.getItem("user");
      //Getting the date and putting it into the correct format for the Post Request
      const timeElapsed = Date.now();
      var today = new Date(timeElapsed);
      today = today.toISOString().split("T")[0];
      console.log(today);

      const newPost = {
        title: this.state.title,
        content: this.state.content,
        date: today,
        poster: user,
        likes: 0,
      };
      axios
        .post(`api/create/`, newPost)
        .then((res) => {
          //Show success alert if we post it
          var succ = document.getElementById("success-alert");
          succ.style.display = "block";
          succ.style.opacity = "1";
          //Then take them back to the main page
          setTimeout(() => {
            this.props.history.push("/");
          }, 1000);
        })
        .catch((err) => {
          //Log error and display fail alert
          console.log(err);
          var fail = document.getElementById("fail-alert");
          fail.style.display = "block";
          fail.style.opacity = "1";
          //Then take them back to the main page
          setTimeout(() => {
            this.props.history.push("/");
          }, 1000);
        });
    }
  };
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleContentChange = (event) => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleCreateSubmit} className="create" id="reg-form">
          <h3>Create a New Post</h3>
          <div className="form-group">
            {/* <label>First name</label> */}
            <input type="text" className="form-control" placeholder="Title" onChange={this.handleTitleChange} />
          </div>
          <div className="form-group">
            {/* <label>Email address</label> */}
            <textarea className="form-control" placeholder="Post Content" rows="5" onChange={this.handleContentChange} />
          </div>
          <button type="submit" className="btn btn-primary top-gap my-button">
            Create!
          </button>

          <div class="alert alert-success my-success" role="alert" id="success-alert">
            Success! Your post has been created!
          </div>
          <div class="alert alert-danger my-fail" role="alert">
            Error! Your post has not been created.
          </div>
        </form>
      </div>
    );
  }
}
