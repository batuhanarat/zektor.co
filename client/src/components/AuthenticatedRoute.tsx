// src/components/AuthenticatedRoute.tsx

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  // Check the authentication status from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // If not authenticated, redirect to landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children (dashboard or protected page)
  return <>{children}</>;
};

export default AuthenticatedRoute;
