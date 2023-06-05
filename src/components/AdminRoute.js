import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('userInfo'))?.auth === 'admin';

  if (admin) {
    return children;
  }

  return <Navigate to="/" />;
};
