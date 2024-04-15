import React from 'react';
import {Grid,TextField,Button, Alert} from '@mui/material';
import '../pages/reglog.css';
import Heading from '../components/Heading';
import logimg from '../assets/logimg.png';
import google from '../assets/google.png'
import { Link } from 'react-router-dom';

const Registragion = () => {
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="regConatiner">
          <div className='headingConatiner'>
          <Heading className='regheading' text="Login to your account!"/>
          </div>
          <div className="google">
            <img className='google' src={google} alt="" />
          </div>
          <div className='inputConainer'>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" type='email'/>
          </div>
          <div className='inputConainer'>
            <TextField id="outlined-basic" label="password" variant="outlined" type='password'/>
          </div>
          <div className="reg_btn">
          <Button variant="contained">Login to Continue</Button>
          <div className="navigate">
            <Alert severity="warning">Don’t have an account ?  <Link to='/'>Sign up</Link></Alert>
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