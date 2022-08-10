import React, { useEffect } from "react";
import styled from "styled-components";
import { __getComments } from "../redux/modules/comments";
import { __postComments } from "../redux/modules/comments";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";

const Comment = ({ userData }) => {
  const dispatch = useDispatch();
  const [commentName, commentNameHandler, commentNameReset] = useInput();
  const [comment, commentHandler, commentReset] = useInput();
  const { comments } = useSelector((state) => state.comments);
  const { username } = userData;

  useEffect(() => {
    dispatch(__getComments());
  }, []);

  const commentData = {
    username: username,
    commentName: commentName,
    comment: comment,
    time: new Date(),
  };

  const commentSubmitHandler = () => {
    dispatch(__postComments(commentData));
    commentNameReset();
    commentReset();
  };

  return (
    <CommnetLayout>
      <InfoData>
        <Card>
          <Photo>
            {/* {userData.img} // 프롭스로 백그라운드 이미지에 받아온이미지 넣기 */}
          </Photo>
          <Banner></Banner>
          <ul>
            <li>
              <b>{userData.username}</b>
            </li>
          </ul>
        </Card>
      </InfoData>
      <CommentInputBox>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
            commentSubmitHandler();
          }}
        >
          <input
            placeholder="닉네임"
            type="text"
            value={commentName}
            onChange={commentNameHandler}
          />
          <input //15글자이상제한
            placeholder="댓글 15글자이상"
            type="text"
            value={comment}
            onChange={commentHandler}
          />
          <CommentInputBtn>
            <button type="submit">댓글추가</button>
          </CommentInputBtn>
        </form>
      </CommentInputBox>
      <CommentBox>
        <div>
          <Chat_thread>
            {comments.map((item) => {
              if (item.username === username) {
                return (
                  <li>
                    {item.comment}15글자이상작성제한
                    <p style={{ "font-size": "14px" }}>{item.commentName}</p>
                    {/* //댓글 작성자 안넣을거면 인풋 하나만 넣고 여긴 시간몇분전 */}
                  </li>
                );
              }
            })}
          </Chat_thread>
        </div>
      </CommentBox>
    </CommnetLayout>
  );
};

export default Comment;
const CommnetLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 48px;
`;
const InfoData = styled.div`
  border: solid red 1px;
`;
const Card = styled.div`
  z-index: 1;
  width: 100%;
  height: 230px;
  margin: 0 auto;

  background-color: white;
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  ul {
    list-style: none;
    text-align: center;
    padding-left: 0;
    margin-top: 60px;
    margin-bottom: 30px;
    font-size: 20px;
  }
`;
const Photo = styled.div`
  z-index: 3;
  position: relative;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  background-color: white;
  margin: 0 auto;
  background-image: url("https://filmshotfreezer.files.wordpress.com/2011/07/untitled-1.jpg");
  background-size: cover;
  background-position: 50% 50%;
  top: 25px;
  -webkit-box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
`;
const Banner = styled.div`
  z-index: 2;
  position: relative;
  margin-top: -154px;
  width: 100%;
  height: 130px;
  background-image: url("https://snap-photos.s3.amazonaws.com/img-thumbs/960w/RQ2Z75PQIN.jpg");
  background-size: cover;
  border-bottom: solid 1px lightgrey;
`;

const CommentInputBox = styled.div`
  margin-top: 15px;
  border: solid red 1px;
`;

const CommentInputBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommentBox = styled.div`
  width: 100%;
  height: 300px;
  border: solid red 1px;
  margin-top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Chat_thread = styled.ul`
  margin: 5px auto 0 auto;
  padding: 0 5px 0 0;
  list-style: none;

  li {
    position: relative;
    clear: both;
    display: block;
    padding: 10px 10px 10px 15px;
    margin: 0 0 5px 0;
    font: 16px/20px "Noto Sans", sans-serif;
    border-radius: 10px;
    background-color: rgba(25, 147, 147, 0.2);
  }
  li:after {
    position: absolute;
    top: 15px;
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid rgba(25, 147, 147, 0.2);
  }
  li:nth-child(odd) {
    float: right;
    margin-right: 50px;
    color: #079f90;
  }
  li:nth-child(odd):before {
    right: -50px;
  }
  li:nth-child(odd):after {
    border-right: 15px solid transparent;
    right: -15px;
  }
  li:nth-child(even) {
    float: left;
    margin-left: 50px;
    color: #0ec879;
  }
  li:nth-child(even):before {
    left: -50px;
  }
  li:nth-child(even):after {
    border-left: 15px solid transparent;
    left: -15px;
  }
`;
