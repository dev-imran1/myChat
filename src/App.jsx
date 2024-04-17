import { useState } from 'react'
import './App.css'
import Registragion from './pages/Registragion.jsx';
import Login from './pages/Login.jsx';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import ForgotPassword from './pages/ForgotPassword.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registragion />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/forgotpassword" element={<ForgotPassword />}/>
      <Route path="/home" element={<Home />}/>
    </Route>
  )
);




function App() {

  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer />
    </>
  )
}

export default App
