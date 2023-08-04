import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './routes/Homepage.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/Global.css'
import './styles/Reuse.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/Register",
    element: <Register/>,
  },
  {
    path: "/user/:userId",
    element: <>User's page</>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
