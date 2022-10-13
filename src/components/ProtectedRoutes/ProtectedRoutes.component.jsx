import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoutes;
