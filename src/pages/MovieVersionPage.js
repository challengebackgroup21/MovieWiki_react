import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function MovieVersionPage() {
  const { movieId } = useParams();
  const [versions, setVersions] = useState([]);
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/post/${movieId}/record`)
      .then((res) => {
        setVersions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setLoading(false);
      });
  }, []);

  const revertHandler = (e, postId, version) => {
    e.preventDefault();
    if (window.confirm('해당 버전으로 게시글을 되돌리시겠습니까?')) {
      axios
        .post(
          `/post/${movieId}/record/${version}`,
          {
            comment: `${version} 버전으로 되돌림`,
          },
          { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
          { withCrdentilas: true }
        )
        .then((res) => {
          alert('버전 되돌리기 성공');
          window.location.reload();
        })
        .catch((err) => {
          alert('로그인이 필요한 기능입니다.');
        });
    }
  };

  return loading ? (
    <Spinner size="lg" />
  ) : (
    <div>
      <Heading m={'5% 0'}>Movie History Page ID: {movieId}</Heading>
      {versions.length === 0 ? (
        <>
          <Text fontSize="xl" color="green">
            아직 히스토리가 없습니다. 새로운 히스토리를 작성해볼까요?
          </Text>
          <Link to={`/movie/${movieId}`}>
            <Button
              mt={'1rem'}
              colorScheme="blackAlpha"
              color={'white.700'}
              border={'1px white solid'}
              variant={'solid'}
            >
              돌아가기
            </Button>
          </Link>
        </>
      ) : (
        ''
      )}
      {versions.map((version) => {
        const contentArr = version?.content.split(/(?<=<\/p>)/gi);
        let removeIdx = [];
        return (
          <Card
            style={{
              width: '60%',
              overflow: 'auto',
              color: 'white',
              backgroundColor: 'rgb(18, 17, 17)',
              border: '2px solid white',
            }}
            shadow={'2xl'}
            m={'1rem auto'}
            className="version-box"
          >
            <CardBody>
              <div className="convercontent">
                {version?.diff.map((di) => {
                  let cnt = 0;
                  if (di.type === 'remove') {
                    const convertContent =
                      "<div class='red'>" + di.value + '</p></div>';
                    removeIdx.forEach((rmIdx) => {
                      if (Number(rmIdx) <= Number(di.idx)) {
                        cnt += 1;
                      }
                    });
                    removeIdx.push(di.idx);
                    contentArr.splice(di.idx + cnt, 0, convertContent);
                  } else if (di.type === 'add') {
                    const convertContent =
                      "<div class='green'>" + di.value + '</p></div>';
                    removeIdx.forEach((rmIdx) => {
                      if (Number(rmIdx) <= Number(di.idx)) {
                        cnt += 1;
                      }
                    });
                    contentArr[di.idx + cnt] = convertContent;
                  }
                })}
                <Text padding={'0.5rem'} fontSize={'2xl'} fontWeight={'bold'}>
                  INFO
                </Text>
                <Divider borderColor={'white'} />
                <Box
                  className="contentArr"
                  fontSize={'lg'}
                  style={{ marginTop: '0.5rem' }}
                  dangerouslySetInnerHTML={{
                    __html: `${contentArr.join('')}`,
                  }}
                ></Box>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <Divider borderColor={'white'} />
                작성자 코멘트 : {version?.comment}
              </div>
              <div>변경 시간 : {version?.createdAt}</div>
              <div>version : {version?.version}</div>

              <ButtonGroup className="btnGroup" colorScheme="blackAlpha">
                <Link
                  to={`/report/${movieId}/${version.version}/?postId=${version.postId}`}
                >
                  <Button
                    color={'white.700'}
                    border={'1px white solid'}
                    variant={'solid'}
                  >
                    &nbsp;신고하기&nbsp;
                  </Button>
                </Link>
                <Button
                  color={'white.700'}
                  border={'1px white solid'}
                  variant={'solid'}
                  onClick={(e) =>
                    revertHandler(e, version.postId, version.version)
                  }
                >
                  &nbsp;되돌리기&nbsp;
                </Button>
              </ButtonGroup>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

export default MovieVersionPage;
