import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  ListIcon,
  ListItem,
  OrderedList,
  Spinner,
} from '@chakra-ui/react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/movies/${movieId}`).then((res) => {
      setMovie(res.data);
    });
    axios.get(`/movies/${movieId}/view`);
    axios
      .get(`/post/${movieId}/record/latest`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  }, []);

  function likeSubmitHandler() {
    axios
      .patch(
        `/${movieId}/like`,
        {},
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 401) alert('로그인이 필요한 기능입니다.');
      });
  }
  return loading ? (
    <Spinner size={'lg'} />
  ) : (
    <Box
      w={'60%'}
      h={'100vh'}
      m={'1rem auto 1rem'}
      overflow={'auto'}
      border={'2px'}
    >
      <Heading p={'1rem'}>{movie?.movieNm}</Heading>
      <Box
        className="movieInfo"
        m={'0 auto'}
        w={'70%'}
        p={'2.5rem'}
        border={'2px solid'}
      >
        <OrderedList fontSize={'xl'} listStyleType={'none'} textAlign={'left'}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            감독:
            {movie?.directors &&
              movie?.directors.map((dircetor) => {
                return ` ${dircetor}`;
              })}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            장르: {movie?.genreAlt}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            출연 배우:{' '}
            {movie?.actors &&
              movie?.actors.map((actor) => {
                return `${actor} `;
              })}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            상영 시간: {movie?.showTm} 분
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            관람 등급: {movie?.watchGradeNm}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            views: {movie?.views}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="gray.500" />
            likes: {movie?.likes}
          </ListItem>
        </OrderedList>
      </Box>

      <Heading m={'1rem'}>INFO</Heading>
      <Box
        border={'2px solid'}
        className="postInfo"
        m={'0 auto'}
        w={'70%'}
        p={'2.3rem'}
        fontSize={'xl'}
        textAlign={'left'}
      >
        <Box
          dangerouslySetInnerHTML={{
            __html: `${post?.content ? post?.content : ''}`,
          }}
        ></Box>
        <br />
        <Box>version : {post?.version}</Box>
      </Box>

      <ButtonGroup
        m={'3rem'}
        display={'flex'}
        justifyContent={'right'}
        colorScheme="blackAlpha"
      >
        <Button color={'blackAlpha.700'} variant={'solid'}>
          <Link style={{}} to={`/movie/update/${movieId}`}>
            수정하기
          </Link>
        </Button>
        <Button color={'blackAlpha.700'} variant={'solid'}>
          <Link style={{}} to={`/movie/version/${movieId}`}>
            히스토리
          </Link>
        </Button>

        <Button
          color={'blackAlpha.700'}
          variant={'solid'}
          onClick={likeSubmitHandler}
        >
          좋아요
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default MovieDetailPage;
