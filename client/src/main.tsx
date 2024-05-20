import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Plant from './Plant.tsx'
import './index.css';
import Login from './pages/login/Login.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path: "plants/:plantId",
    element: <Plant></Plant>,
  },
  {

      path: "/login",
      element: <Login/>

  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='page'>
    <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)
