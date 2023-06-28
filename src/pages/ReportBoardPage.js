import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ReportBoardPage() {
  const [reports, setReports] = useState([]);
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        '/notifications',
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        setReports(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert('로딩 실패');
        setLoading(false);
        navigate(-1);
      });
  }, []);
  const acceptReport = (notiId) => {
    axios
      .patch(
        `/notifications/${notiId}/accept`,
        {
          status: 'ACCEPT',
          // period: ,
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const rejectReport = (notiId) => {
    axios
      .patch(
        `/notifications/${notiId}/reject`,
        { status: 'REJECT' },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return loading ? (
    <Spinner />
  ) : (
    <Box
      border={'2px solid white'}
      w={'80%'}
      m={'5% auto'}
      h={'100vh'}
      p={'1rem'}
      overflow={'auto'}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'white',
          borderRadius: '24px',
        },
      }}
    >
      <Heading>신고 목록 게시판</Heading>
      <div
        className="board"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '5px auto',
        }}
      >
        {reports.map((report) => {
          return report?.status === 'AWAIT' ? (
            <Link to={`/report/${report?.notiId}`}>
              <Box
                style={{ border: '2px solid ', margin: '0.8rem 0' }}
                p={'1rem'}
                textAlign={'left'}
                className="report"
                fontWeight={'semibold'}
                fontSize={'lg'}
                boxShadow={'dark-lg'}
                _hover={{
                  transform: 'translate(0, -1rem)',
                  transition: '0.3s',
                }}
              >
                <Text>notiId: {report?.notiId}</Text>

                <Text>movieId: {report?.movieId}</Text>

                <Text>postId: {report?.postId}</Text>

                <Text>신고한 사람: {report?.reporterId}</Text>

                <Text>신고 당한 사람: {report?.reportedId}</Text>

                <Text>신고 내용: {report?.notificationContent}</Text>
                <Text>처리 상태: {report?.status}</Text>
              </Box>
            </Link>
          ) : (
            <Box
              style={{
                border: '2px solid gray',
                color: 'gray',
                margin: '0.8rem 0',
              }}
              p={'1rem'}
              textAlign={'left'}
              className="report"
              fontWeight={'semibold'}
              fontSize={'lg'}
              boxShadow={'dark-lg'}
            >
              <Text>notiId: {report?.notiId}</Text>

              <Text>movieId: {report?.movieId}</Text>

              <Text>postId: {report?.postId}</Text>

              <Text>신고한 사람: {report?.reporterId}</Text>

              <Text>신고 당한 사람: {report?.reportedId}</Text>

              <Text>신고 내용: {report?.notificationContent}</Text>
              <Text>처리 상태: {report?.status}</Text>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}

export default ReportBoardPage;
