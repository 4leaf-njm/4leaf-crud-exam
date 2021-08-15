import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [postList, setPostList] = useState(null);

  const getPostListHandler = async () => {
    await axios
      .post(
        "/api/test",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    getPostListHandler();
  }, []);

  return <div>Hello World</div>;
};

export default App;
