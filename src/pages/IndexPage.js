import { Box, Card, Input, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TrendingList from '../components/TrendingList';
function IndexPage() {
  const [option, setOption] = useState('total');
  const [searchWord, setSearchWord] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchResultDisplay, setSearchReulstDisplay] = useState(false);

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
        setSearchReulstDisplay(true);
        setSearchMovies(res.data);
      })
      .catch((err) => {
        setSearchMovies([]);
        alert(err.response.data.error);
      });
  };
  return (
    <div>
      <Text style={{ margin: '5% 0', fontWeight: 'bold' }} fontSize="5xl">
        <Link onClick={() => window.location.reload()} to="/">
          <span>Movie Wiki</span>
        </Link>
      </Text>

      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <Box w="100px" m="0 0.5rem">
          <Select
            onChange={handleOption}
            name="option"
            id="option"
            size="sm"
            borderRadius={'3px'}
          >
            <option value="total">전체</option>
            <option value="movieNm">제목</option>
            <option value="directors">감독</option>
            <option value="genreAlt">장르</option>
            <option value="nationAlt">제작국가</option>
            <option value="openDt">개봉년도</option>
          </Select>
        </Box>

        <Input
          style={{ width: '50%', borderRadius: '10px' }}
          onChange={handleSearchWord}
          type="text"
          name="search"
          id="search"
          size="sm"
          variant="filled"
          bgColor={'blackAlpha.200'}
        />
        <button style={{ margin: '0 1rem' }}>
          <BsSearch onClick={handleSearch} />
        </button>
      </form>
      {!searchResultDisplay ? (
        <TrendingList />
      ) : (
        <div
          className="searchResult"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text m={'1rem 0 1.5rem 0'} fontSize={'2xl'}>
            검색 결과
          </Text>
          {searchMovies.length === 0 ? (
            <Text fontSize={'xl'} style={{ color: 'green' }}>
              검색 결과가 존재하지 않습니다.
            </Text>
          ) : (
            searchMovies.map((movie) => {
              return (
                <Card
                  w={'60%'}
                  variant={'outline'}
                  border={'2px'}
                  borderRadius={'5px'}
                  m={'1rem 0'}
                  fontSize={'lg'}
                  fontWeight={'500'}
                  _hover={{
                    transform: 'translate(0, -0.7rem)',
                    transition: '0.6s',
                  }}
                  shadow={'dark-lg'}
                >
                  <Link
                    style={{
                      textAlign: 'left',
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
                </Card>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default IndexPage;
