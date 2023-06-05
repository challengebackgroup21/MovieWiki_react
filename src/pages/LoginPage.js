import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [redierct, setRedirect] = useState(false);
  const [password, setPassword] = useState('');
  async function login(ev) {
    ev.preventDefault();
    const response = await axios
      .post(
        'http://localhost:3001/auth/login',
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
    return <Navigate to={'/'} />;
  }
  return (
    <form
      className="login"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '33%',
        margin: '0 auto',
      }}
      onSubmit={login}
    >
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Login</button>
    </form>
  );
}

export default LoginPage;
