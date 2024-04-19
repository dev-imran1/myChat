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
import Home from './home/Home.jsx';
import Message from './home/Message.jsx';
import Setting from './home/Setting.jsx'
import Logout from './home/Logout.jsx'
import Notification from './home/Notification.jsx'
import RootLayouts from './components/RootLayouts.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registragion />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
      <Route path='/chatting-app' element={<RootLayouts/>}>
        <Route path="home" element={<Home />}></Route>
        <Route path='message' element={<Message />}></Route>
        <Route path='setting' element={<Setting />}></Route>
        <Route path='notification' element={<Notification />}></Route>
        <Route path='logout' element={<Logout />}></Route>
      </Route>
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
