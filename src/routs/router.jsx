import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import MyProfile from "../pages/MyProfile";
import ManagePost from "../pages/ManagePost";
import AddVolunteer from "../pages/AddVolunteer";
import NeedVolunteer from "../pages/NeedVolunteer";
import VolunteerRequest from "../pages/VolunteerRequest";
import NeedVolunteerById from "../pages/NeedVolunteerById";
import VolunteerEdit from "../pages/VolunteerEdit";
import MyRequests from "../pages/MyRequests";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement:<Error></Error>,
      children:[
        {
          index:true,
          element: <Home/>,
        },
        {
          path: '/registration',
          element:<Registration/>
        },
        {
          path: '/login',
          element:<Login/>
        },
        {
          path: '/add-volunteer',
          element: <PrivateRoute><AddVolunteer /></PrivateRoute>
        },
        {
          path: '/manage-post',
          element: <PrivateRoute><ManagePost /></PrivateRoute>
        },
        {
          path: '/manage-request',
          element: <PrivateRoute><MyRequests /></PrivateRoute>
        },
        {
          path: '/need-volunteer',
          element: <PrivateRoute><NeedVolunteer /></PrivateRoute>
        },
        {
          path: '/volunteer-request',
          element: <PrivateRoute><VolunteerRequest /></PrivateRoute>
        },
        {
          path: '/volunteers/:id',
          element: <PrivateRoute><NeedVolunteerById /></PrivateRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_HOST}/volunteers/${params.id}`)
        },
        {
          path: '/volunteers/:id/edit',
          element: <PrivateRoute><VolunteerEdit /></PrivateRoute>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_HOST}/volunteers/${params.id}`)
        }
      ]
    },
  ]);

