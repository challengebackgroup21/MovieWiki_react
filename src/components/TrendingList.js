import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function TrendingList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`/movies/like?cnt=5`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div style={{ margin: '3% 0' }}>
      <Text m={'1rem 0'} fontSize="3xl" fontWeight={'medium'}>
        실시간 인기 영화
      </Text>

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
                backgroundColor: '',

                width: '19%',
              }}
              to={`/movie/${movie.movieId}`}
            >
              <Card
                overflow={'auto'}
                scroll
                size={'sm'}
                variant={'outline'}
                style={{ height: '400px' }}
                border={'1px'}
                margin={'0 5px'}
                fontSize={'xl'}
                key={movie.movieId}
                shadow={'lg'}
                _hover={{
                  transform: 'translate(0, -1rem)',
                  transition: '0.3s',
                  shadow: '2xl',
                }}
              >
                <CardHeader>
                  <Heading size="md">{movie.movieNm}</Heading>
                </CardHeader>
                <CardBody textAlign={'left'}>
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
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TrendingList;
