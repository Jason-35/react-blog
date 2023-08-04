import React from 'react'
import ReactDOM from 'react-dom/client'
import Homepage from './routes/Homepage.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as registerAction } from "./actions/RegisterAction.tsx"
import './styles/Global.css'
import './styles/Reuse.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>,
    action: registerAction,
  },
  {
    path: "/user/:userId",
    element: <>User's page</>,
  },
  {
    path: "/dashboard",
    element: <>Dashboard page</>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
