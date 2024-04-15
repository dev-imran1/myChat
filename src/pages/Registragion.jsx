import React from 'react';
import {Grid,TextField,Button} from '@mui/material';
import '../pages/reglog.css';
import Heading from '../components/Heading';
import regimg from '../assets/regimg.png';

const Registragion = () => {
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
            <TextField id="outlined-basic" label="Email Address" variant="outlined" type='email'/>
          </div>
            <div className='inputConainer'>
            <TextField id="outlined-basic" label="full name" variant="outlined" type='text'/>
          </div>
            <div className='inputConainer'>
            <TextField id="outlined-basic" label="password" variant="outlined" type='password'/>
          </div>
          <div className="reg_btn">
          <Button variant="contained">Contained</Button>
          </div>
          </div>
          
        </Grid>
        <Grid xs={6}>
          <img className='regimg' src={regimg} alt="" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Registragion