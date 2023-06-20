import { Box, Button, ButtonGroup, Heading, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
function ReportPage() {
  const { movieId, version } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState();
  const [notificationContent, setNotificationContent] = useState('');
  const postId = searchParams.get('postId');

  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);

  const submitReportHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `/notifications/${postId}`,
        {
          postId: postId,
          notificationContent: notificationContent,
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        navigate(-1);
      })
      .catch((err) => alert('신고 실패'));
  };

  const handleNotificationContentChange = (e) => {
    setNotificationContent(e.target.value);
  };

  return (
    <Box
      border={'1px black solid'}
      w={'80%'}
      m={'5% auto'}
      overflow={'auto'}
      p={'10%'}
    >
      <Heading>Report</Heading>
      <div style={{ fontWeight: '600', margin: '1rem' }}>
        movie: {movieId}, version: {version}
      </div>
      <div className="report-box" style={{ fontWeight: '600', margin: '1rem' }}>
        <Input
          w={'50%'}
          mb={'1rem'}
          textAlign={'center'}
          placeholder="신고 내용"
          type="text"
          name="notificationContent"
          id="notificationContent"
          value={notificationContent}
          onChange={handleNotificationContentChange}
        />
        <div>version : {version}</div>
      </div>
      <ButtonGroup colorScheme="blackAlpha">
        <Link to={`/movie/version/${movieId}`}>
          <Button color={'blackAlpha.700'} variant={'solid'}>
            돌아가기
          </Button>
        </Link>
        <Button
          color={'blackAlpha.700'}
          variant={'solid'}
          onClick={submitReportHandler}
        >
          신고하기
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default ReportPage;
