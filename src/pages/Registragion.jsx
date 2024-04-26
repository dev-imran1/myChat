import React, { useState } from 'react';
import {Grid,TextField,Button, Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import '../pages/reglog.css';
import Heading from '../components/Heading';
import regimg from '../assets/regimg.png';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

let initialize = {
  email: "",
  fullname: '',
  password: '',
  loader: false,
  eye: false,
  error:""
}
const Registragion = () => {
  const notify = (msg) => toast(msg);
  const navigate = useNavigate()
  const auth = getAuth();
  const db = getDatabase();
  let [eamilError, setEmailError]= useState("");
  let [nameError, setNameError]= useState("");
  let [passwordError, setPasswordError]= useState("");
  let [values, setvalues]=useState(initialize);
 
  let handelChange =(e)=>{
    setvalues({
    ...values,
    [e.target.name] : e.target.value
    })
  }

  let handelClick = () =>{
    let {email,fullname,password} =values;

    if(!email){
      // setvalues({
      //   ...values,
      //   error: "Enter your email"
      // })    
      setEmailError("Enter Your email")                  
      return
    }
    if(!fullname){
      // setvalues({
      //   ...values,
      //   error: "Enter your name"
      // })
      setNameError("Enter Your Name")
      return
    }
    if(!password){
      // setvalues({
      //   ...values,
      //   error: "type your password"
      // })
      setPasswordError("Enter Your Password")
      return
    }
    createUserWithEmailAndPassword(auth, email, password,fullname).then((user) => {
      updateProfile(auth.currentUser, {
        displayName: values.fullname,
        photoURL: "https://i.ibb.co/F0vjXj8/images.png",
        email: values.email
      }).then(() => {
        sendEmailVerification(auth.currentUser).then(()=>{
          console.log(user.user.uid)
          notify("Please Your Email Verify")
          set(ref(db, 'users/'+user.user.uid), {
            username: values.fullname,
            email: values.email,
            profile_picture : user.user.photoURL
          });
        })
      }).catch((error) => {
        notify("Type your name")
        console.log(error)
      });
      
    setvalues({
      email: "",
      fullname: '',
      password: '',
      loader:false
    })
    navigate("/login")
  })
  }
let handelEye = ()=>{
  setvalues({
    ...values,
    eye:!values.eye
  }
  )
  
}

  return (
    <div>
      <Grid container spacing={0}>
        <Grid  xs={6}>
          <div className="regConatiner">
          <div className='headingConatiner'>
          <Heading className='regheading' text="Get started with easily register"/>
          <p>Free register and you can enjoy it</p>
          </div>            
             <div className='inputConainer'>
            <TextField onChange={handelChange} name='email' value={values.email} id="outlined-basic" label="Email Address" variant="outlined" type='email'/>
           {/* {values.error.includes("email") &&
            <Alert severity="error">{values.error}</Alert>
           } */}
           {eamilError && 
            <Alert severity="error">{eamilError}</Alert>
           }
          </div>
            <div className='inputConainer'>
            <TextField onChange={handelChange} name='fullname' value={values.fullname} id="outlined-basic" label="full name" variant="outlined" type='text'/>
            {/* {values.error.includes("name") &&
            <Alert severity="error">{values.error}</Alert>
           } */}
            {nameError && 
            <Alert severity="error">{nameError}</Alert>
           }
          </div>
            <div className='inputConainer eye_position'>
            <TextField onChange={handelChange} name='password' value={values.password} id="outlined-basic" label="password" variant="outlined" type={values.eye? "text" : "password"}/>
            {/* {values.error.includes("password")  &&
            <Alert severity="error">{values.error}</Alert>
           } */}
            {passwordError && 
            <Alert severity="error">{passwordError}</Alert>
           }
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
            <Button onClick={handelClick} variant="contained">Contained</Button>
          }
          </div>
          <div className="navigate">
            <Alert severity="warning">Already  have an account ? <Link to='/login'>Sign In</Link></Alert>
          </div>
          </div>         
        </Grid>
        <Grid xs={6}>
          <img className='regimg' src={regimg} alt="" />
        </Grid>
      </Grid>
      {/* <Alert variant="filled" severity="warning">
         This is a filled warning Alert.
      </Alert> */}
    </div>
  )
}

export default Registragion