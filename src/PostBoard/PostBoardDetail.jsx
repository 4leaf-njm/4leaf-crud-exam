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
        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            제목
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            {postData && postData.title}
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            작성자
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            {postData && postData.author}
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            등록일
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            {postData && postData.createdAt}
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            조회수
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            {postData && postData.hit}
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} al={`normal`} margin={`5px`}>
          <Wrapper width={`150px`} bgColor={`#f3f3f3`}>
            내용
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            width={`calc(100% - 150px)`}
            padding={`10px`}
            borderBottom={`1px solid #f3f3f3`}
          >
            {postData &&
              postData.content.split(`\n`).map((data, idx) => {
                return (
                  <Wrapper
                    key={`${data}${idx}`}
                    margin={`2px 0`}
                    width={`auto`}
                  >
                    {data}
                  </Wrapper>
                );
              })}
          </Wrapper>
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
