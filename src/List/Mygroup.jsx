import React, { useState } from "react";
import UserTitle from "../components/UserTitle";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Mygroup = () => {
  const db = getDatabase();
  let initialValue = {
    groupname: "",
    grouptagline: "",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [groupInfo, setGroupInfo] = useState([initialValue]);
  let userData = useSelector((state) => state.logeduser.loginuser);

  let handelGroup = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

  let handelClick = () => {
    let { groupname, grouptagline } = groupInfo;
    set(push(ref(db, "mygroup")), {
      groupname: groupname,
      grouptagline: grouptagline,
      adminid: userData.uid,
      adminname:userData.displayName
    }).then(() => {
      setOpen(false);
    });
  };

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="My Group" />
        <div>
          <Button onClick={handleOpen} variant="contained">
            +Group
          </Button>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Create New Group
              </Typography>
              <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                <TextField
                  onChange={handelGroup}
                  fullWidth
                  margin="dense"
                  id="outlined-basic"
                  label="Group Name"
                  variant="filled"
                  name="groupname"
                />
                <TextField
                  onChange={handelGroup}
                  fullWidth
                  margin="dense"
                  id="outlined-basic"
                  label="Group Tagline"
                  variant="filled"
                  name="grouptagline"
                />
                <Button
                  onClick={handelClick}
                  margin="dense"
                  variant="contained"
                >
                  Submit
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="main__content">
        <div className="profile__img">
          <img src={profile} alt="" />
        </div>
        <div className="profile__details">
          <h4>Friends Reunion</h4>
          <p>Hi Guys, Wassup!</p>
        </div>
        <div className="profile__btn">
          <Button variant="contained">join</Button>
        </div>
      </div>
    </div>
  );
};

export default Mygroup;
