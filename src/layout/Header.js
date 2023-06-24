import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isLogin, setIslogin] = useState(false);
  const [userInfo, setUserInfo] = useState(() =>
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      setIslogin(true);
    }
  }, []);

  function logout() {
    // axios
    //   .put(
    //     'http://localhost:3001/auth/logout',
    //     {},
    //     { headers: { Authorization: `Bearer ${userInfo?.refreshToken}` } },
    //     { withCrdentilas: true }
    //   )
    //   .then((result) => {
    //     localStorage.removeItem('userInfo');
    //     navigate('/');
    //   });
    localStorage.removeItem('userInfo');
    window.location.replace('/');
  }

  const userEmail = userInfo?.email;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.7rem',
      }}
    >
      <nav style={{ marginLeft: '1rem' }}>
        <Link className="indexHead" style={{ fontWeight: 'bold' }} to="/">
          MOVIE WIKI
        </Link>
      </nav>
      <nav style={{ marginRight: '1rem' }}>
        {isLogin ? (
          <>
            <div style={{ display: 'inline-block', marginRight: '1rem' }}>
              {userEmail}
            </div>
            <Link onClick={logout}>
              <Button className="headerBtn">logout</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="headerBtn">login</Button>
            </Link>
            <Link to="/signup" style={{ paddingLeft: '1rem' }}>
              <Button className="headerBtn">signup</Button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
