import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Wrapper,
  RsWrapper,
  Input,
  Button,
  Select,
  SelectOption,
} from "../styles/CommonComponent";
import moment from "moment";

const PostBoardList = ({ history }) => {
  const [postList, setPostList] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [inputSort, setInputSort] = useState("1");

  const moveLinkHandler = (link) => {
    history.push(link);
  };

  const getPostListHandler = async () => {
    await axios
      .post(
        "/api/getPostList",
        {
          searchValue: inputSearchValue,
          sort: inputSort,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPostList(response.data.result);
      });
  };

  useEffect(() => {
    getPostListHandler();
  }, []);

  useEffect(() => {
    getPostListHandler();
  }, [inputSearchValue, inputSort]);

  return (
    <Wrapper margin={`50px 0`}>
      <RsWrapper>
        <Wrapper margin={`0 0 20px`} dr={`row`} ju={`space-between`}>
          <Wrapper width={`auto`} dr={`row`}>
            <Input
              type="text"
              placeholder={`제목으로 검색`}
              value={inputSearchValue}
              onChange={(e) => {
                setInputSearchValue(e.target.value);
              }}
            />
          </Wrapper>

          <Wrapper width={`auto`}>
            <Select
              value={inputSort}
              onChange={(e) => setInputSort(e.target.value)}
            >
              <SelectOption value={`1`}>최신순</SelectOption>
              <SelectOption value={`2`}>오래된순</SelectOption>
            </Select>
          </Wrapper>
        </Wrapper>

        <Wrapper dr={`row`} ju={`flex-end`} margin={`20px 0 40px`}>
          <Button width={`120px`} onClick={() => moveLinkHandler(`/write`)}>
            등록
          </Button>
        </Wrapper>

        <Wrapper dr={`row`}>
          <Wrapper width={`10%`}>번호</Wrapper>
          <Wrapper width={`55%`}>제목</Wrapper>
          <Wrapper width={`10%`}>작성자</Wrapper>
          <Wrapper width={`15%`}>등록일</Wrapper>
          <Wrapper width={`10%`}>조회수</Wrapper>
        </Wrapper>

        {postList ? (
          postList.length === 0 ? (
            <Wrapper margin={`20px 0`}>조회된 데이터가 없습니다.</Wrapper>
          ) : (
            postList.map((data, idx) => {
              return (
                <Wrapper
                  key={data._id}
                  dr={`row`}
                  margin={`10px 0`}
                  cursor={`pointer`}
                  onClick={() => moveLinkHandler(`/detail/${data._id}`)}
                >
                  <Wrapper width={`10%`}>{idx + 1}</Wrapper>
                  <Wrapper width={`55%`}>{data.title}</Wrapper>
                  <Wrapper width={`10%`}>{data.author}</Wrapper>
                  <Wrapper width={`15%`}>
                    {moment(data.createdAt).format("YYYY.MM.DD")}
                  </Wrapper>
                  <Wrapper width={`10%`}>{data.hit}</Wrapper>
                </Wrapper>
              );
            })
          )
        ) : (
          <Wrapper margin={`20px 0`}>데이터 조회중 ...</Wrapper>
        )}
      </RsWrapper>
    </Wrapper>
  );
};

export default PostBoardList;
