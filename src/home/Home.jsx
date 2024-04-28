import React, { useEffect } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import "../home/home.css";
import Usrlist from "../List/Usrlist";
import Mygroup from "../List/Mygroup";
import Friend from "../List/Friend";
import FriendRequest from "../List/FriendRequest";
import GroupList from "../List/GroupList";
import BlockList from "../List/BlockList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {

  let navigate = useNavigate();
  let logindata = useSelector((state) => state.logeduser.loginuser);
  
 useEffect(()=>{
  if(logindata == null){
    navigate("/login")
  }
 },[])

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <GroupList />
        </Grid>
        <Grid item xs={4}>
          <Friend />
        </Grid>
        <Grid item xs={4}>
          <Usrlist />
        </Grid>
        <Grid item xs={4}>
          <FriendRequest />
        </Grid>
        <Grid item xs={4}>
          <Mygroup />
        </Grid>
        <Grid item xs={4}>
          <BlockList />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
