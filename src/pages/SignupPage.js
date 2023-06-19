import { Button, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [redierct, setRedirect] = useState(false);

  async function signup(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/signup', {
        email: email,
        password: password,
        nickname: nickname,
      });
      alert('registration successful');
      setRedirect(true);
    } catch (error) {
      alert('registration failed');
    }
  }
  if (redierct) return <Navigate to={'/login'} />;
  return (
    <form
      className="signup"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '33%',
        margin: '0 auto',
      }}
      onSubmit={signup}
    >
      <Text fontSize={'5xl'} fontWeight={'bold'} margin={'10% 0 20% 0'}>
        Sign up
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
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
        border={'1px'}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        border={'1px'}
        m={'5% 0'}
      />
      <Button
        mt={'5%'}
        colorScheme="blackAlpha"
        color={'blackAlpha.700'}
        variant={'solid'}
        onClick={signup}
      >
        Sign up
      </Button>
    </form>
  );
}

export default SignupPage;
