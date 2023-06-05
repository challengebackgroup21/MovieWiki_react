import { Navigate } from 'react-router-dom';

export const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  if (user) {
    return children;
  } else {
    alert('로그인이 필요합니다.');
  }

  return <Navigate to={'/login'} />;
};
