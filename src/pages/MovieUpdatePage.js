import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

function MovieUpdatePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [post, setPost] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${movieId}`).then((res) => {
      setMovie(res.data);
      console.log(movie);
    });
    axios.get(`http://localhost:3001/post/${movieId}/record`).then((res) => {
      console.log(res.data[0]);
      if (res.data[0]) {
        setPost(res.data[0]);
        setContent(res.data[0].content);
        setComment(res.data[0].comment);
      }
    });
  }, []);

  const handleChangecontent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/post/${movieId}/record`, {
        content: content,
        comment: comment,
      })
      .then((res) => {
        alert(res);
        navigate(`http://localhost:3001/movies/${movieId}`);
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
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="5"
            onChange={handleChangecontent}
            value={content}
          ></textarea>
        </div>
        <div>version : {post?.version}</div>
        <div>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="2"
            onChange={handleChangeComment}
            value={comment}
          ></textarea>
        </div>
      </div>
      <button
        onClick={submitHandler}
        style={{ padding: '0.2rem', margin: '10px 0' }}
      >
        수정하기
      </button>
    </div>
  );
}

export default MovieUpdatePage;
