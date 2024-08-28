import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust import based on your context setup

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isAuthorized = roles.includes(user?.role);

  return isAuthorized ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
