import React from "react";
import { Route } from "react-router-dom";
import Wall from "./components/Wall";
import PostView from "./components/PostView";
import PostCreateView from "./components/PostCreateView";

function BaseRouter() {
  return (
    <div>
      <Route exact path="/" component={Wall} />
      <Route exact path="/posts/:postID" component={PostView} />
      <Route exact path="/create/" component={PostCreateView} />
    </div>
  );
}

export default BaseRouter;
