import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrapper,
  RsWrapper,
  Input,
  Textarea,
  Button,
} from "../styles/CommonComponent";
import queryString from "query-string";

const PostBoardWrite = ({ history, location }) => {
  const query = queryString.parse(location.search);

  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputContent, setInputContent] = useState("");

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const createPostHandler = async () => {
    if (!inputTitle || inputTitle.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!inputAuthor || inputAuthor.trim() === "") {
      alert("작성자를 입력해주세요.");
      return;
    }

    if (!inputContent || inputContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    await axios
      .post(
        "/api/createPost",
        {
          title: inputTitle,
          author: inputAuthor,
          content: inputContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          alert("게시글이 정상적으로 등록되었습니다.");
          history.goBack();
        } else {
          alert("처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

  const updatePostHandler = async () => {
    if (!inputTitle || inputTitle.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!inputAuthor || inputAuthor.trim() === "") {
      alert("작성자를 입력해주세요.");
      return;
    }

    if (!inputContent || inputContent.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    await axios
      .post(
        "/api/updatePost",
        {
          id: query.id,
          title: inputTitle,
          author: inputAuthor,
          content: inputContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          alert("게시글이 정상적으로 수정되었습니다.");
          history.goBack();
        } else {
          alert("처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

  const getPostDetailHandler = async () => {
    await axios
      .post(
        "/api/getPostDetail",
        {
          id: query.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data.result;

        setInputTitle(data.title);
        setInputAuthor(data.author);
        setInputContent(data.content);
      });
  };

  useEffect(() => {
    if (query.id) {
      setIsUpdateMode(true);
      getPostDetailHandler();
    } else {
      setIsUpdateMode(false);
    }
  }, [query.id]);

  return (
    <Wrapper margin={`50px 0`}>
      <RsWrapper>
        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            제목
          </Wrapper>

          <Wrapper
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            <Input
              type="text"
              padding={`10px`}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            작성자
          </Wrapper>

          <Wrapper
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            <Input
              type="text"
              padding={`10px`}
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
            />
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            내용
          </Wrapper>

          <Wrapper
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            <Textarea
              type="text"
              height={`300px`}
              padding={`10px`}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
            />
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} margin={`30px 0`}>
          <Button
            width={`240px`}
            height={`40px`}
            onClick={isUpdateMode ? updatePostHandler : createPostHandler}
          >
            {isUpdateMode ? `수정` : `등록`}
          </Button>
        </Wrapper>
      </RsWrapper>
    </Wrapper>
  );
};

export default PostBoardWrite;
