import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        'http://localhost:3001/notifications',
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        setReports(res.data);
        console.log(reports);
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
        `http://localhost:3001/notifications/${notiId}/accept`,
        { status: 'ACCEPT' },
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
        `http://localhost:3001/notifications/${notiId}/reject`,
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
      border={'2px solid black'}
      w={'80%'}
      m={'5% auto'}
      h={'100vh'}
      p={'1rem'}
      overflow={'auto'}
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
          return (
            <Box
              style={{ border: '2px solid black', margin: '0.8rem 0' }}
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

              {report?.status === 'AWAIT' ? (
                <ButtonGroup
                  display={'flex'}
                  justifyContent={'right'}
                  mr={'0.5rem'}
                >
                  <Button
                    colorScheme="green"
                    color={'blackAlpha.700'}
                    variant={'solid'}
                    onClick={() => {
                      acceptReport(report.notiId);
                    }}
                  >
                    승인
                  </Button>
                  <Button
                    colorScheme="red"
                    color={'blackAlpha.700'}
                    variant={'solid'}
                    onClick={() => {
                      rejectReport(report.notiId);
                    }}
                  >
                    거부
                  </Button>
                </ButtonGroup>
              ) : (
                <span>처리 상태: {report.status}</span>
              )}
            </Box>
          );
        })}
      </div>
    </Box>
  );
}

export default ReportBoardPage;
