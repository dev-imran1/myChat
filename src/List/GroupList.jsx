import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from '../assets/profile.png'
import { Button } from "@mui/material";
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

const GroupList = () => {
  const db = getDatabase();
  let [groups, setGroups] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);

  useEffect(() => {
    const groupRef = ref(db, "mygroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.val().adminid) {
          arr.push({...item.val(),id:item.key});
        }
      });
      setGroups(arr);
    });
  }, []);


  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="Group List" />
        <BsThreeDotsVertical />
      </div>
      {groups && groups.length > 0
      ?
      groups.map((item, index)=>(
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
    "no data"
    }
    </div>
  );
};

export default GroupList;
