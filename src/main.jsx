import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Components/MainLayout.jsx';
import Home from './Components/Home.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Provider from './Components/Provider.jsx';
import Allvisa from './Components/Allvisa.jsx';
import Addvisa from './Components/Addvisa.jsx';
import Myaddedvisa from './Components/Myaddedvisa.jsx';
import MyvisaApp from './Components/MyvisaApp.jsx';
import Details from './Components/Details.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import ErrorPages from './Components/ErrorPages.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<ErrorPages></ErrorPages>,
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/allvisa",
        element:<Allvisa></Allvisa>,
        loader:()=>fetch("https://visa-server-bice.vercel.app/addvisa")
      },
      {
        path:"/visa/:id",
        element:<PrivateRoute><Details></Details></PrivateRoute>,
        loader:({params})=>fetch(`https://visa-server-bice.vercel.app/${params.id}`)
      },
      {
        path:"/addvisa",
        element:<PrivateRoute><Addvisa></Addvisa></PrivateRoute>
      },
      {
        path:"/myaddedvisa",
        element:<PrivateRoute><Myaddedvisa></Myaddedvisa></PrivateRoute>
      },
      {
        path:"/myvisaapp",
        element:<PrivateRoute><MyvisaApp></MyvisaApp></PrivateRoute>
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </Provider>,
)
