import React, { useEffect, useState } from 'react';

function TrendingList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    setMovies([
      {
        movieId: 1,
        movieNm: '주토피아',
        showTm: '122',
        openDt: '20120223',
        typeNm: '장편',
        nationNm: '미국',
        genres: ['드라마', '멜로/로맨스'],
        directors: '켄 콰피스',
        actors: ['드류 베리모어', '크리스틴 벨'],
        watchGradeNm: '전체관람가',
        likes: 12,
      },
      {
        movieId: 2,
        movieNm: '주토피아2',
        showTm: '122',
        openDt: '20120223',
        typeNm: '장편',
        nationNm: '미국',
        genres: ['드라마', '멜로/로맨스'],
        directors: '켄 콰피스',
        actors: ['드류 베리모어', '크리스틴 벨'],
        watchGradeNm: '전체관람가',
        likes: 13,
      },
    ]);
  }, []);

  return (
    <div>
      <h3>인기 리스트</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {movies.map((movie) => {
          return (
            <div style={{ padding: '1rem' }} key={movie.movieId}>
              <div>제목: {movie.movieNm}</div>
              <div>감독: {movie.directors}</div>
              <div>장르: {movie.genres}</div>
              <div>출연 배우: {movie.actors}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingList;
