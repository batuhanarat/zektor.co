import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter,Route } from 'react-router-dom'
import Plant from './Plant.tsx'
import { MainHeader } from './MainHeader.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "plants/:plantId",
    element: <Plant></Plant>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='page'>
      <MainHeader/>
    <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)
