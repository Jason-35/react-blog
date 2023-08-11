import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './routes/LandingPage.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import Homepage from './routes/Homepage.tsx';
import Navbar from './routes/Navbar.tsx';
import BlogCollection from './routes/BlogCollection.tsx';
import BrowsePage from './routes/BrowsePage.tsx';
import CommunityPage from './routes/CommunityPage.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as userAction } from "./actions/UserAction.tsx"
// import Root, { loader as rootLoader } from "./routes/root";
import { loader as userLoader } from "./loaders/UserLoader.tsx"
import { loader as postLoader } from "./loaders/PostLoader.tsx"
import './styles/Global.css'
import './styles/Reuse.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/login",
    element: <Login/>,
    action: userAction
  },
  {
    path: "/register",
    element: <Register/>,
    action: userAction,
  },
  {
    path: "/user/:userId",
    element: <>User's page</>,
  },
  {
    path: "/",
    element: <Navbar/>,
    loader: userLoader,
    action: userAction,
    errorElement: <>Error no access here boi</>,
    children: [
      {
        path: "home/:username",
        element: <Homepage/>,
      },
      {
        path: "home/:username/collection",
        element: <BlogCollection/>,
      },
      {
        path: "home/browse",
        loader: postLoader,
        element: <BrowsePage/>,
      },
      {
        path: "home/community",
        element: <CommunityPage/>,
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
