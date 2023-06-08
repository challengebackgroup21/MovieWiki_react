import axios from 'axios';
import React, { useEffect, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

function MovieUpdatePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [post, setPost] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [userInfo, setUserInfo] = useState();
  const [lastestPost, setLastestPost] = useState();
  const [lastestActive, setLastestActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }

    axios.get(`http://localhost:3001/movies/${movieId}`).then((res) => {
      setMovie(res.data);
    });
    axios
      .get(`http://localhost:3001/post/${movieId}/record/latest`)
      .then((res) => {
        setPost(res.data ? res.data : '');
        setContent(res.data.content ? res.data.content : '');
        setComment(res.data?.comment ? res.data.comment : '');
      })
      .catch((err) => {});
  }, []);

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/post/${movieId}/record`,
        {
          content: content,
          comment: comment,
          version: post.version ? post.version : '',
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          axios
            .get(`http://localhost:3001/post/${movieId}/record/latest`)
            .then((res) => {
              alert(
                '현재 수정하고 있는 버전의 이전 버전이 누군가의 수정에 의해 변경되었습니다. 수정 사항들을 ctrl+C로 저장한 후 다시 시도해주세요.'
              );
              setLastestPost(res.data);
              setLastestActive(true);
            })
            .catch((err) => {});
        }
      });
  };

  return (
    <div>
      <h1>Movie Info</h1>
      <div className="movieInfo">
        <div style={{ padding: '1rem' }}>
          <h4>제목: {movie.movieNm}</h4>
          <div>
            감독:
            {movie.directors &&
              movie.directors.map((dircetor) => {
                return dircetor;
              })}
          </div>
          <div>장르: {movie.genreAlt}</div>
          <div>
            출연 배우:{' '}
            {movie.actors &&
              movie.actors.map((actor) => {
                return `${actor} `;
              })}
          </div>
          <div>상영 시간: {movie.showTm} 분</div>
          <div>관람 등급: {movie.watchGradeNm}</div>
          <div>views: {movie.views}</div>
          <div>likes: {movie.likes}</div>
        </div>
      </div>
      <div className="postInfo">
        설명
        <div>
          <Editor onChange={setContent} value={content} />
        </div>
        <div>version : {post?.version}</div>
        <div>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="2"
            onChange={handleChangeComment}
            placeholder="comment"
            value={comment}
          ></textarea>
        </div>
      </div>
      {lastestActive ? (
        <div style={{ color: 'green' }} className="lastestPostInfo">
          <div>현재 최신 버전</div>
          <div>작성자 : {lastestPost?.userId}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: `내용${lastestPost?.content}`,
            }}
          ></div>
          <div>작성자 코멘트 : {lastestPost?.comment}</div>
          <div>변경 시간 : {lastestPost?.createdAt}</div>
          <div>version : {lastestPost?.version}</div>
        </div>
      ) : (
        ''
      )}

      <button
        onClick={submitHandler}
        style={{ padding: '0.2rem', margin: '10px 0' }}
      >
        수정하기
      </button>
      <Link to={`/movie/${movieId}`}>
        <button style={{ padding: '0.2rem', margin: '10px' }}>돌아가기</button>
      </Link>
    </div>
  );
}

export default MovieUpdatePage;
