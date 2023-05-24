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
      await axios.post('/api/auth/signup', {
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
      <h1>Register</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="nickname"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Signup</button>
    </form>
  );
}

export default SignupPage;
