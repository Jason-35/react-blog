import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './routes/LandingPage.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import Navbar from './routes/Navbar.tsx';
import BlogCollection from './routes/BlogCollection.tsx';
import BrowsePage from './routes/BrowsePage.tsx';
import CreateBlog from './routes/CreateBlog.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as userAction } from "./actions/UserAction.tsx"
import { action as postAction } from "./actions/PostAction.tsx"
import { loader as userLoader } from "./loaders/UserLoader.tsx"
import { loader as allpostLoader } from "./loaders/AllPostLoader.tsx"
import { loader as userpostLoader } from "./loaders/UserPostLoader.tsx"
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
    path: "/",
    element: <Navbar/>,
    loader: userLoader,
    action: userAction,
    errorElement: <>Error no access here boi</>,
    children: [
      {
        path: "home/:username/create",
        action: postAction,
        element: <CreateBlog/>,
      },
      {
        path: "home/:username/collection",
        loader: userpostLoader,
        element: <BlogCollection/>,
      },
      {
        path: "home/browse",
        loader: allpostLoader,
        element: <BrowsePage/>,
      },

      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
