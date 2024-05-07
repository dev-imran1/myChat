import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FaSearch } from "react-icons/fa";
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
  let [myGroups, setMyGroups] = useState([]);
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
      adminname: userData.displayName,
      adminimg: userData.photoURL
    }).then(() => {
      setOpen(false);
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "mygroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid == item.val().adminid) {
          arr.push({...item.val(),id:item.key});
        }
      });
      setMyGroups(arr);
    });
  }, []);

  let handelDelete =(item)=>{
    remove(remove(ref(db, "mygroup/", item.id)));
  }
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
      {myGroups && myGroups.length > 0 
      ?
      myGroups.map((item, index) => (
        <div key={index} className="main__content">
          <div className="profile__img">
            <img src={item.adminimg} alt="" />
          </div>
          <div className="profile__details">
            <h4>Admin Name: {item.adminname}</h4>
            <h4>Group Name: {item.groupname}</h4>
            <p style={{fontSize:"15px", fontWeight:"bold"}}>Group TagLine :{item.grouptagline}</p>
          </div>
          <div className="profile__btn">
            <Button onClick={()=>handelDelete(item)} variant="contained">Delete</Button>
          </div>
        </div>
      ))
      :
        <h3 className="nogroup">No Group...</h3>
      }
    </div>
  );
};

export default Mygroup;
