// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Plant from './Plant.tsx';
import './index.css';
import Login from './pages/login/Login.tsx';
import List from './pages/list/List.tsx';
import Single from './pages/single/Single.tsx';
import LandingPage from './pages/landing/LandingPage.tsx';
import AuthenticatedRoute from './components/AuthenticatedRoute.tsx';
import TeamPage from './pages/landing/TeamPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/team",
    element: <TeamPage/>
  },
  {
    path: "/dashboard",
    element: (
      <AuthenticatedRoute>
        <App />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/plants",
    element: (
      <AuthenticatedRoute>
        <List />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/plants/:plantId",
    element: (
      <AuthenticatedRoute>
        <Plant />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sensorGraph",
    element: (
      <AuthenticatedRoute>
        <Single />
      </AuthenticatedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='page'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
