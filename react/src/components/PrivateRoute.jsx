import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return (
      <div data-easytag="id1-react/src/components/PrivateRoute.jsx">
        <Navigate to="/login" replace state={{ from: location.pathname }} />
      </div>
    );
  }
  return <div data-easytag="id2-react/src/components/PrivateRoute.jsx">{children}</div>;
};

export default PrivateRoute;
