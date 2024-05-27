import React from "react";
import { Grid } from "@mui/material";
import "./message.css";
import MsgGroup from "../List/MsgGroup";
import ChatBox from "../List/ChatBox";
import MsgFriend from "../List/MsgFriend";

const Message = () => {
  return (
    <div className="box">
      <Grid container spacing={0}>
        <Grid xs={4}>
          <MsgGroup />
          <MsgFriend />
        </Grid>
        <Grid xs={8}>
          <ChatBox />
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
