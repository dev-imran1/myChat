import React, { useState } from 'react';
import {Grid,TextField,Button, Alert} from '@mui/material';
import '../pages/reglog.css';
import Heading from '../components/Heading';
import logimg from '../assets/logimg.png';
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { FaEye,FaEyeSlash } from "react-icons/fa";



const Registragion = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()
  const notify = (msg) => toast(msg);

  let initialize = {
    email: "",
    password: '',
    loader: false,
    eye: false,
  }
  
  let [values, setvalues]= useState(initialize);

    let handelGoogle =()=>{
      signInWithPopup(auth, provider)
    .then((result) => {
    //  navigate("/")
    })
    }
    let handelEye = ()=>{
      setvalues({
        ...values,
        eye:!values.eye
      }
      )
    }

  let handelChangeLogin =(e)=>{
    setvalues({
      ...values,
      [e.target.name] : e.target.value
    })
  }

let handelLogin =()=>{
  let {email,password} =values;

  setvalues({
    ...values,
    loader:false,
  })
  signInWithEmailAndPassword(auth, email, password)
  .then((user) => {
    notify("Login Done");
    navigate("/chatting-app/home")
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    if(errorCode === "auth/invalid-email"){
      notify("Please Type Your Eamil & password")
    }
    if(errorCode === "auth/missing-password"){
      notify("Please Type Your password")
    }
    if(errorCode === "auth/invalid-credential"){
      notify("Email/Password Wrong")
    }
  });
}

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="regConatiner">
          <div className='headingConatiner'>
          <Heading className='regheading' text="Login to your account!"/>
          </div>
          <div className="google">
            <img className='google' src={google} alt="" onClick={handelGoogle}/>
          </div>
          <div className='inputConainer'>
            <TextField onChange={handelChangeLogin} name='email' id="outlined-basic" label="Email Address" variant="outlined" type='email'/>
          </div>
          <div className='inputConainer'>
            <TextField onChange={handelChangeLogin} value={values.password}  name='password' id="outlined-basic" label="password" variant="outlined" type={values.eye? "text" : "password"}/>
            <div className="eye" onClick={handelEye}>
              {values.eye
              ?
              <FaEye />
              :
              <FaEyeSlash />
            }
            </div>
          </div>
          <div className="reg_btn">
          {values.loader
            ?
            <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>   
            :
            <Button onClick={handelLogin} variant="contained">Login to Continue</Button>
          }
          <div className="navigate">
            <div className='login__Alert'>
            <Alert severity="warning">Don’t have an account ?  <Link to='/'>Sign up</Link></Alert>
            <Alert severity="warning">Forgot Password ?  <Link to='/forgotpassword'>Click Here</Link></Alert>
            </div>
          </div>
          </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className='logimg' src={logimg} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Registragion