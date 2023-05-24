import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [post, setPost] = useState('');

  useEffect(() => {
    setMovie({
      movie_id: 1,
      movieNm: '주토피아',
      showTm: 122,
      openDt: 20120223,
      typeNm: '장편',
      nationNm: '미국',
      genres: ['드라마', '멜로/로맨스'],
      directors: '켄 콰피스',
      actors: ['드류 베리모어', '크리 스틴 벨'],
      watchGradeNm: '전체관람가',
      likes: 3,
    });

    setPost({
      userIp: '1.12.33.451',
      comment: '동심을 깨우는 주토피아',
      createdAt: '20230524_16:02:22',
      version: 1,
    });
  }, []);

  return (
    <div>
      <h1>Movie Info</h1>
      <div className="movieInfo">
        <div>movie_id : {movieId}</div>
        <div>movieNm : {movie.movieNm}</div>
        <div>showTm : {movie.showTm}</div>
        <div>openDt : {movie.openDt}</div>
        <div>typeNm : {movie.typeNm}</div>
        <div>nationNm : {movie.nationNm}</div>
        <div>genres : {movie.genres}</div>
        <div>directors : {movie.directors}</div>
        <div>actors : {movie.actors}</div>
        <div>watchGradeNm : {movie.watchGradeNm}</div>
        <div>likes : {movie.likes}</div>
      </div>
      <div className="postInfo">
        <div>작성자 : userNickname</div>
        <div>설명 : {post.comment}</div>
        <div>version : {post.version}</div>
      </div>
      <Link style={{ padding: '0.5rem' }} to={`/movie/update/${movieId}`}>
        수정하기
      </Link>
      <Link style={{ padding: '0.5rem' }} to={`/movie/version/${movieId}`}>
        히스토리
      </Link>
    </div>
  );
}

export default MovieDetailPage;
