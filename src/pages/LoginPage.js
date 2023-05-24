import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
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
        placeholder="username"
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
