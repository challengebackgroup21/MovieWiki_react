import {
  Box,
  Button,
  Card,
  FormControl,
  Heading,
  Image,
  Input,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
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
  const [loading, setLoading] = useState(false);

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleSearchWord = (e) => setSearchWord(e.target.value);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .get(`/movies/search?option=${option}&query=` + searchWord, {
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
      })
      .then((res) => {
        setSearchReulstDisplay(true);
        setSearchMovies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setSearchMovies([]);
        setLoading(false);
        alert(err.response.data.error);
      });
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      axios
        .get(`/movies/search?option=${option}&query=` + searchWord, {
          headers: {
            'Content-type': 'application/json; charset=utf-8',
          },
        })
        .then((res) => {
          setSearchReulstDisplay(true);
          setSearchMovies(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setSearchMovies([]);
          setLoading(false);
          alert(err.response.data.error);
        });
    }
  };
  return loading ? (
    <Spinner size={'lg'} />
  ) : (
    <div>
      <Text
        className="indexHead"
        style={{ margin: '5% 0', fontWeight: 'bold' }}
        fontSize="7xl"
      >
        <Link onClick={() => window.location.reload()} to="/">
          <span>MOVIE WIKI</span>
        </Link>
      </Text>

      <FormControl
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box w="100px" m="0 0.5rem">
          <Select
            bgColor={'rgb(18, 17, 17)'}
            onChange={handleOption}
            name="option"
            id="option"
            size="md"
            fontSize={'xl'}
            borderRadius={'3px'}
          >
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="total"
            >
              전체
            </option>
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="movieNm"
            >
              제목
            </option>
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="directors"
            >
              감독
            </option>
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="genreAlt"
            >
              장르
            </option>
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="nationAlt"
            >
              제작국가
            </option>
            <option
              style={{ backgroundColor: 'rgb(18, 17, 17)' }}
              value="openDt"
            >
              개봉년도
            </option>
          </Select>
        </Box>

        <Input
          style={{ width: '50%' }}
          onChange={handleSearchWord}
          onKeyDown={handleSearchKeyPress}
          type="text"
          name="search"
          id="search"
          size="md"
          fontSize={'xl'}
          bgColor="rgb(18, 17, 17)"
          border={'2px solid white'}
          focusBorderColor="black"
        />
        <Button colorScheme="black">
          <BsSearch color="white" onClick={handleSearch} />
        </Button>
      </FormControl>
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
                  color={'white'}
                  backgroundColor={'rgb(18, 17, 17)'}
                  w={'60%'}
                  variant={'outline'}
                  border={'2px'}
                  borderRadius={'5px'}
                  m={'1rem 0'}
                  fontSize={'lg'}
                  fontWeight={'500'}
                  _hover={{
                    transform: 'translate(0, -0.7rem)',
                    transition: '0.3s',
                  }}
                  style={{ boxShadow: '8px 8px 6px rgba(175, 174, 183, 0.5)' }}
                >
                  <Link
                    style={{
                      textAlign: 'left',
                    }}
                    to={`/movie/${movie.movieId}`}
                  >
                    <div style={{ padding: '1rem' }} key={movie.movieId}>
                      <Heading size={'lg'} p={'0.5rem 0'}>
                        {movie.movieNm}
                      </Heading>
                      {movie.imageUrl ? (
                        <Image
                          src={movie?.imageUrl}
                          w={'200px'}
                          alt="movieImg"
                          m={'1rem 0'}
                        />
                      ) : (
                        ''
                      )}

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
