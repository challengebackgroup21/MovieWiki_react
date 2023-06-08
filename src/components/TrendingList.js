import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TrendingList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/movies/like?cnt=5`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res) => {
        setMovies(res.data);
      })
      .catch(setMovies([]));
  }, []);

  return (
    <div>
      <h3>인기 리스트</h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {movies.map((movie) => {
          return (
            <Link
              style={{
                padding: '0.5rem',
                color: 'black',
                textDecoration: 'none',
                backgroundColor: '#eee',
                border: '1px solid black',
                width: '17%',
              }}
              to={`/movie/${movie.movieId}`}
            >
              <div style={{ padding: '1rem' }} key={movie.movieId}>
                <h4>제목: {movie.movieNm}</h4>
                <div>
                  감독:
                  {movie.directors}
                </div>
                <div>장르: {movie.genreAlt}</div>
                <div>
                  출연 배우:{' '}
                  {movie?.actors &&
                    movie?.actors.map((actor) => {
                      return `${actor} `;
                    })}
                </div>
                <div>상영 시간: {movie.showTm} 분</div>
                <div>관람 등급: {movie.watchGradeNm}</div>
                <div>views: {movie.views}</div>
                <div>likes: {movie.likes}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingList;
