import { Button, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [redierct, setRedirect] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function login(ev) {
    ev.preventDefault();
    const response = await axios
      .post(
        '/auth/login',
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const userInfo = jwtDecode(res.data.accessToken);
        userInfo.accessToken = res.data.accessToken;
        userInfo.refreshToken = res.data.refreshToken;
        localStorage.clear();
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setRedirect(true);
      })
      .catch((err) =>
        alert('로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요')
      );
  }
  if (redierct) {
    window.location.replace('/');
  }
  return (
    <form
      className="login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '33%',
        margin: '0 auto',
      }}
      onSubmit={login}
    >
      <Text fontSize={'5xl'} fontWeight={'bold'} margin={'10% 0 20% 0'}>
        Login
      </Text>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        border={'1px'}
        m={'5% 0'}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        border={'1px'}
        placeholder="password"
      />

      <Button
        onClick={login}
        mt={'5%'}
        colorScheme="blackAlpha"
        color={'white.700'}
        border={'1px white solid'}
        variant={'solid'}
      >
        Login
      </Button>
    </form>
  );
}

export default LoginPage;
