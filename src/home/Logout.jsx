import React from 'react'
import {Grid,TextField,Button, Alert} from '@mui/material';
import { getAuth,signOut} from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const auth = getAuth();
  const navigate = useNavigate()
  const notify = (msg) => toast(msg);

  let handelSignOUt =()=>{
  console.log('ami logout');
  signOut(auth).then(() => {
     notify("Logout Done")
      navigate("/login")
    })
  }
  return (
    <Button className='singoutBtn' onClick={handelSignOUt} variant="contained">Log Out</Button>
  )
}

export default Logout