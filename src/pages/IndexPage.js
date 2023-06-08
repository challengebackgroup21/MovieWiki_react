import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TrendingList from '../components/TrendingList';
function IndexPage() {
  const [option, setOption] = useState('total');
  const [searchWord, setSearchWord] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(
        `http://localhost:3001/movies/search?option=${option}&query=` +
          searchWord,
        {
          headers: {
            'Content-type': 'application/json; charset=utf-8',
          },
        }
      )
      .then((res) => {
        setSearchMovies(res.data);
      });
  };
  return (
    <div>
      <h1 style={{ margin: '100px 0' }}>Movie Wiki</h1>
      <form>
        <select onChange={handleOption} name="option" id="option">
          <option value="total">전체</option>
          <option value="movieNm">제목</option>
          <option value="directors">감독</option>
          <option value="genreAlt">장르</option>
          <option value="nationAlt">제작국가</option>
          <option value="openDt">개봉년도</option>
        </select>
        <input
          onChange={handleSearchWord}
          type="text"
          name="search"
          id="search"
        />
        <button onClick={handleSearch}>검색</button>
      </form>
      <TrendingList />
      <h3>검색 결과</h3>
      <div
        className="searchResult"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {searchMovies.map((movie) => {
          return searchMovies.length === 0 ? (
            <div>검색 결과가 존재하지 않습니다.</div>
          ) : (
            <>
              <Link
                style={{
                  textAlign: 'left',
                  textDecoration: 'none',
                  color: '#666',
                  border: '1px solid #666',
                  margin: '5px 0',
                  width: '85%',
                  padding: '0.5rem',
                }}
                to={`/movie/${movie.movieId}`}
              >
                <div style={{ padding: '1rem' }} key={movie.movieId}>
                  <h4>제목: {movie.movieNm}</h4>
                  <div>
                    감독:
                    {movie?.directors &&
                      movie?.directors.map((dir) => {
                        return `${dir.peopleNm}`;
                      })}
                  </div>
                  <div>장르: {movie.genreAlt}</div>
                  <div>
                    출연 배우:{' '}
                    {movie?.actors &&
                      movie?.actors.map((actor) => {
                        return `${actor.peopleNm} `;
                      })}
                  </div>
                  <div>상영 시간: {movie.showTm} 분</div>
                  <div>관람 등급: {movie.watchGradeNm}</div>
                  <div>views: {movie.views}</div>
                  <div>likes: {movie.likes}</div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default IndexPage;
