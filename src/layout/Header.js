import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
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
        <Link to="/login">login</Link>
        <Link to="/signup" style={{ paddingLeft: '1rem' }}>
          signup
        </Link>
      </nav>
    </div>
  );
}

export default Header;
