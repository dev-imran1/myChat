import React from 'react'
import {Grid,TextField,Button, Alert} from '@mui/material';
import '../home/home.css'

const Home = () => {

  return (
    <>
   <Grid container spacing={0}>
  <Grid xs={4} className='home__box'>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
  <Grid className='home__box-item'  xs={4}>
    <h1>xs=4</h1>
  </Grid>
   </Grid>
</Grid>
    </> 
  )
}

export default Home