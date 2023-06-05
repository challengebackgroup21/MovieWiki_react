import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      return setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);
  console.log(userInfo);

  function logout() {
    axios
      .put(
        'http://localhost:3001/auth/logout',
        { headers: { authorization: userInfo?.refreshToken } },
        { withCrdentilas: true }
      )
      .then((result) => {
        localStorage.removeItem('userInfo');
        navigate('/');
      });
  }

  const userEmail = userInfo?.email;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.5rem',
      }}
    >
      <nav style={{ marginLeft: '1rem' }}>
        <Link to="/">MovieWiki</Link>
      </nav>
      <nav style={{ marginRight: '1rem' }}>
        {userEmail && (
          <>
            <div style={{ display: 'inline-block', marginRight: '1rem' }}>
              {userEmail}
            </div>
            <Link onClick={logout}>logout</Link>
          </>
        )}
        {!userEmail && (
          <>
            <Link to="/login">login</Link>
            <Link to="/signup" style={{ paddingLeft: '1rem' }}>
              signup
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
