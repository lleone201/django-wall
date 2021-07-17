import React from "react";
import { Route } from "react-router-dom";
import Wall from "./components/Wall";
import PostView from "./components/PostView";
import PostCreateView from "./components/PostCreateView";
import VerificationSent from "./components/VerificationSent";

function BaseRouter() {
  return (
    <div>
      <Route exact path="/" component={Wall} />
      <Route exact path="/posts/:postID" component={PostView} />
      <Route exact path="/create/" component={PostCreateView} />
      <Route exact path="/verification-sent/" component={VerificationSent} />
    </div>
  );
}

export default BaseRouter;
