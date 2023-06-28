import { Button, ButtonGroup, Heading, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ReportDetail() {
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const { notiId } = useParams();
  const [period, setPeriod] = useState(1);
  const navigate = useNavigate();
  const acceptReport = (notiId, period) => {
    axios
      .patch(
        `/notifications/${notiId}/accept`,
        {
          status: 'ACCEPT',
          period: period,
        },
        { headers: { Authorization: `Bearer ${userInfo?.accessToken}` } },
        { withCrdentilas: true }
      )
      .then((res) => {
        alert(res.data);
        navigate(-1);
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
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Heading m={'15% 0 5%'}>신고 상세</Heading>
      <Text mb={'2rem'}>신고 ID: {notiId}</Text>
      <ButtonGroup>
        <Select
          defaultValue={'1'}
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option style={{ backgroundColor: 'rgb(18, 17, 17)' }} value="1">
            1일
          </option>
          <option style={{ backgroundColor: 'rgb(18, 17, 17)' }} value="3">
            3일
          </option>
          <option style={{ backgroundColor: 'rgb(18, 17, 17)' }} value="7">
            7일
          </option>
          <option style={{ backgroundColor: 'rgb(18, 17, 17)' }} value="30">
            30일
          </option>
          <option style={{ backgroundColor: 'rgb(18, 17, 17)' }} value="-1">
            영구
          </option>
        </Select>
        <Button
          colorScheme="green"
          color={'white.700'}
          variant={'solid'}
          onClick={() => {
            acceptReport(notiId, period);
          }}
        >
          승인
        </Button>

        <Button
          colorScheme="red"
          color={'white.700'}
          variant={'solid'}
          onClick={() => {
            rejectReport(notiId);
          }}
        >
          거부
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ReportDetail;
