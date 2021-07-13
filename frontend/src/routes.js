import React from "react";
import { Route } from "react-router-dom";
import Wall from "./components/Wall";
import PostView from "./components/PostView";

function BaseRouter() {
  return (
    <div>
      <Route exact path="/" component={Wall} />
      <Route exact path="/posts/:postID" component={PostView} />
    </div>
  );
}

export default BaseRouter;
