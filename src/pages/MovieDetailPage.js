import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [post, setPost] = useState();
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  useEffect(() => {
    axios.get(`http://localhost:3001/movies/${movieId}`).then((res) => {
      setMovie(res.data);
    });
    axios.get(`http://localhost:3001/movies/${movieId}/view`);
    axios
      .get(`http://localhost:3001/post/${movieId}/record/latest`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);
  function likeSubmitHandler() {
    axios
      .patch(
        `http://localhost:3001/movie/${movieId}/like`,
        {},
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div>
      <h1>Movie Info</h1>
      <div className="movieInfo">
        <div style={{ padding: '1rem' }}>
          <h4>제목: {movie?.movieNm}</h4>
          <div>
            감독:
            {movie?.directors &&
              movie?.directors.map((dircetor) => {
                return dircetor;
              })}
          </div>
          <div>장르: {movie?.genreAlt}</div>
          <div>
            출연 배우:{' '}
            {movie?.actors &&
              movie?.actors.map((actor) => {
                return `${actor} `;
              })}
          </div>
          <div>상영 시간: {movie?.showTm} 분</div>
          <div>관람 등급: {movie?.watchGradeNm}</div>
          <div>views: {movie?.views}</div>
          <div>likes: {movie?.likes}</div>
        </div>
      </div>
      <div className="postInfo">
        <div
          dangerouslySetInnerHTML={{
            __html: `설명 ${post?.content ? post?.content : ''}`,
          }}
        ></div>
        <div>version : {post?.version}</div>
      </div>
      <button>
        <Link
          style={{ padding: '0.5rem', textDecoration: 'none', color: 'black' }}
          to={`/movie/update/${movieId}`}
        >
          수정하기
        </Link>
      </button>
      <button style={{ margin: '0 0.5rem' }}>
        <Link
          style={{ padding: '0.5rem', textDecoration: 'none', color: 'black' }}
          to={`/movie/version/${movieId}`}
        >
          히스토리
        </Link>
      </button>

      <button onClick={likeSubmitHandler}>좋아요</button>
    </div>
  );
}

export default MovieDetailPage;
