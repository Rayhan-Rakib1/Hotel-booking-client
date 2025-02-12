import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import Rooms from "../Pages/Rooms";
import RoomDetails from "../Pages/RoomDetails";
import PrivateRoute from "./PrivateRoute";
import BookedRooms from "../Pages/BookedRooms";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'signIn',
        element: <SignIn></SignIn>
      },
      {
        path: 'rooms',
        element: <Rooms></Rooms>
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`https://hotel-booking-server-blond.vercel.app/rooms/${params.id}`)
      },
      {
        path: 'bookedRooms',
        element: <PrivateRoute><BookedRooms></BookedRooms></PrivateRoute>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);

export default router;