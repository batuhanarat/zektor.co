import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Plant from './Plant.tsx'
import './index.css';
import Login from './pages/login/Login.tsx'
import List from './pages/list/List.tsx'
import Single from './pages/single/Single.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path: "plants/",
    element: <List/>,
  },
  {
    path: "plants/:plantId",
    element: <Plant></Plant>,
  },
  {

      path: "/login",
      element: <Login/>

  },
  {
    path: "/sensorGraph",
    element : <Single/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='page'>
    <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)
