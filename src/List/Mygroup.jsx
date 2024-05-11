import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import "./grouplist.css";
import profile from "../assets/profile.png";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Mygroup = () => {
  const db = getDatabase();
  
  
  let [myGroups, setMyGroups] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
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
    remove(ref(db, "mygroup/", item.id));
  }
  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="My Group" />
        <div>
            
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
            <div>
            <Button  onClick={handleOpen} className="mybtn" variant="contained">Request</Button>
            <Button className="mybtn" variant="contained">Members</Button>
            <Button className="mybtn" onClick={()=>handelDelete(item)} variant="contained">Delete</Button>

            </div>
          </div>
        </div>
      ))
      :
        <h3 className="nogroup">No Group...</h3>
      }
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
      </div>
    </div>
  );
};

export default Mygroup;
