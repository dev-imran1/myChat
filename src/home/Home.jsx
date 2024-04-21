import React from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import "../home/home.css";
import Usrlist from "../List/Usrlist";
import Mygroup from "../List/Mygroup";
import Friend from "../List/Friend";
import FriendRequest from "../List/FriendRequest";

const Home = () => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Usrlist />
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
