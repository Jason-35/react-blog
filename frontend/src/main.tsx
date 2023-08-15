import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './routes/LandingPage.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import Navbar from './routes/Navbar.tsx';
import BlogCollection from './routes/BlogCollection.tsx';
import BrowsePage from './routes/BrowsePage.tsx';
import CreateBlog from './routes/CreateBlog.tsx';
import ViewPost from './routes/ViewPost.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as userAction } from "./actions/UserAction.tsx"
import { action as postAction } from "./actions/PostAction.tsx"
import { loader as userLoader } from "./loaders/UserLoader.tsx"
import { loader as allpostLoader } from "./loaders/AllPostLoader.tsx"
import { loader as userpostLoader } from "./loaders/UserPostLoader.tsx"
import { loader as viewpostLoader } from "./loaders/ViewPostLoader.tsx"
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
    errorElement: <>Error no access here</>,
    children: [
      {
        path: "home/:username/create",
        action: postAction,
        element: <CreateBlog/>,
      },
      {
        path: "home/:username/collection",
        loader: userpostLoader,
        action: postAction,
        element: <BlogCollection/>,
      },
      {
        path: "home/browse",
        loader: allpostLoader,
        element: <BrowsePage/>,
      },
      {
        path: "/post/:postId",
        loader: viewpostLoader,
        element: <ViewPost/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
