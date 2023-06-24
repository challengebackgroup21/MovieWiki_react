import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Highlight,
  Input,
  ListIcon,
  ListItem,
  OrderedList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

function MovieUpdatePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState('');
  const [post, setPost] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const [lastestPost, setLastestPost] = useState();
  const [lastestActive, setLastestActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/movies/${movieId}`).then((res) => {
      setMovie(res.data);
    });
    axios
      .get(`/post/${movieId}/record/latest`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data ? res.data : '');
        setContent(res.data.content ? res.data.content : '');
        setComment(res.data?.comment ? res.data.comment : '');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `/post/${movieId}/record`,
        {
          content: content,
          comment: comment,
          version: post.version ? post.version : null,
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        console.log(res);
        alert('수정 성공');
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 409) {
          axios
            .get(`/post/${movieId}/record/latest`)
            .then((res) => {
              alert(
                '현재 수정하고 있는 버전의 이전 버전이 누군가의 수정에 의해 변경되었습니다. 수정 사항들을 ctrl+C로 저장한 후 다시 시도해주세요.'
              );
              setLastestPost(res.data);
              setLastestActive(true);
            })
            .catch((err) => {});
        }
      });
  };
  const contentArr = lastestPost?.content.split(/(?<=<\/p>)/gi);
  return loading ? (
    <Spinner size="lg" />
  ) : (
    <Box
      w={'60%'}
      h={'100vh'}
      m={'1rem auto 1rem'}
      border={'1px'}
      overflow={'auto'}
    >
      <Heading p={'1rem'} mb={'3%'}>
        {movie?.movieNm}
      </Heading>
      <Box className="movieInfo">
        <OrderedList
          m={'0 auto'}
          w={'50%'}
          fontSize={'xl'}
          listStyleType={'none'}
          textAlign={'left'}
        >
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            감독:
            {movie?.directors &&
              movie?.directors.map((dircetor) => {
                return ` ${dircetor}`;
              })}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            장르: {movie?.genreAlt}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            출연 배우:{' '}
            {movie?.actors &&
              movie?.actors.map((actor) => {
                return `${actor} `;
              })}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            상영 시간: {movie?.showTm} 분
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            관람 등급: {movie?.watchGradeNm}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            views: {movie?.views}
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="rgb(229, 9, 20)" />
            likes: {movie?.likes}
          </ListItem>
        </OrderedList>
      </Box>

      <Heading m={'1rem'}>INFO</Heading>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        className="postInfo"
      >
        <Box
          className="post"
          m={'0 auto'}
          w={'50%'}
          fontSize={'xl'}
          textAlign={'left'}
        >
          <Editor
            style={{ margin: '0' }}
            onChange={setContent}
            value={content}
          />

          <Box mt={'1rem'}>
            Comment
            <Input
              name="comment"
              id="comment"
              onChange={handleChangeComment}
              placeholder="comment"
              value={comment}
            />
          </Box>
          <Box mt={'1rem'}>version : {post?.version}</Box>
        </Box>

        {lastestActive ? (
          <Box
            className="lastestPostInfo"
            border={'2px solid white'}
            p={'1rem'}
            m={'0 auto'}
            w={'38%'}
            fontSize={'xl'}
            textAlign={'left'}
          >
            <Heading size={'md'} m={'0 0 1rem 0'} lineHeight="tall">
              <Highlight
                query="현재 최신 버전"
                styles={{ px: '5', py: '2', rounded: 'full', bg: 'red.200' }}
              >
                현재 최신 버전
              </Highlight>
            </Heading>
            {lastestPost?.thisVersionDiff.map((di) => {
              if (di.type === 'remove') {
                const convertContent =
                  "<div class='red'>" + di.value + '</p></div>';
                contentArr[di.idx] = convertContent;
              } else if (di.type === 'add') {
                const convertContent =
                  "<div class='green'>" + di.value + '</p></div>';
                contentArr[di.idx] = convertContent;
              }
            })}
            <Box
              className="contentBox"
              border={'1px solid'}
              borderColor={'blackAlpha.300'}
              p={'0.5rem'}
            >
              <Box
                mb={'2rem'}
                dangerouslySetInnerHTML={{
                  __html: `${contentArr.join('')}`,
                }}
              ></Box>
              <Text>Comment : {lastestPost?.comment}</Text>
              <Text>version : {lastestPost?.version}</Text>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>

      <ButtonGroup
        m={'3rem'}
        display={'flex'}
        justifyContent={'right'}
        colorScheme="blackAlpha"
      >
        <Button
          onClick={submitHandler}
          color={'white.700'}
          border={'1px white solid'}
          variant={'solid'}
        >
          수정하기
        </Button>
        <Link to={`/movie/${movieId}`}>
          <Button
            color={'white.700'}
            border={'1px white solid'}
            variant={'solid'}
          >
            돌아가기
          </Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
}

export default MovieUpdatePage;
