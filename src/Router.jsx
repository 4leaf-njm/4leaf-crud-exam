import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import PostBoardList from "./PostBoard/PostBoardList.jsx";
import PostBoardDetail from "./PostBoard/PostBoardDetail.jsx";
import PostBoardWrite from "./PostBoard/PostBoardWrite.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Route exact path="/" component={PostBoardList} />
      <Route exact path="/detail/:id" component={PostBoardDetail} />
      <Route exact path="/write" component={PostBoardWrite} />
    </Router>
  );
};

export default AppRouter;
