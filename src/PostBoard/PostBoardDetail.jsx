import React, { useState, useEffect } from "react";
import axios from "axios";
import { Wrapper, RsWrapper, Button } from "../styles/CommonComponent";

const PostBoardDetail = ({ match, history }) => {
  const id = match.params.id;

  const [postData, setPostData] = useState(null);

  const moveLinkHandler = (link) => {
    history.push(link);
  };

  const getPostDetailHandler = async () => {
    await axios
      .post(
        "/api/getPostDetail",
        {
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPostData(response.data.result);
      });
  };

  const deletePostHandler = () => {
    const result = window.confirm("해당 게시글을 삭제하시겠습니까 ?");

    if (result) deletePostHandlerAfter();
  };

  const deletePostHandlerAfter = async () => {
    await axios
      .post(
        "/api/deletePost",
        {
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.result) {
          alert("게시글이 정상적으로 삭제되었습니다.");
          history.push("/");
        } else {
          alert("처리 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

  useEffect(() => {
    getPostDetailHandler();
  }, []);

  return (
    <Wrapper margin={`50px 0`}>
      <RsWrapper>
        <Wrapper margin={`10px 0`}>제목 : {postData && postData.title}</Wrapper>
        <Wrapper margin={`10px 0`}>
          내용 : {postData && postData.content}
        </Wrapper>
        <Wrapper margin={`10px 0`}>
          작성자 : {postData && postData.author}
        </Wrapper>
        <Wrapper margin={`10px 0`}>조회수 : {postData && postData.hit}</Wrapper>
        <Wrapper margin={`10px 0`}>
          등록일 : {postData && postData.createdAt}
        </Wrapper>

        <Wrapper dr={`row`} margin={`20px 0`}>
          <Button
            margin={`0 5px`}
            width={`120px`}
            onClick={() => moveLinkHandler(`/`)}
          >
            목록
          </Button>
          <Button
            margin={`0 5px`}
            width={`120px`}
            onClick={() => moveLinkHandler(`/write?id=${postData._id}`)}
          >
            수정
          </Button>
          <Button margin={`0 5px`} width={`120px`} onClick={deletePostHandler}>
            삭제
          </Button>
        </Wrapper>
      </RsWrapper>
    </Wrapper>
  );
};

export default PostBoardDetail;
