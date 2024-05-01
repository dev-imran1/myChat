import React, { useEffect, useState } from "react";
import profile from '../assets/profile.png'
import { Button } from "@mui/material";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from "react-redux";

const Friend = () => {
  let userData = useSelector((state) => state.logeduser.loginuser);
  let [friendsList, setfriendsList]= useState([])
  const db = getDatabase();

  console.log(friendsList)

  useEffect(() => {
    const userRef = ref(db, "friends/");
    onValue(userRef, (snapshot) => { 
      let arr = [];
      snapshot.forEach((item) => {
        if(userData.uid == item.val().whoreciveid){
          arr.push({...item.val(), id:item.key})
        }
      });
      setfriendsList(arr);
    });
  }, []);


  return (
    <div className="main__wrapper">
    <div className="title__wrapper">
      <UserTitle className="userTitle" text="Friends List" />
      <BsThreeDotsVertical />
    </div>
    {friendsList && friendsList.length > 0
    ?
    friendsList.map((item)=>{
      <div className="main__content">
      <div className="profile__img">
        <img src={item.whorecivename} alt="" />
      </div>
      <div className="profile__details">
        <h4>Friends Reunion</h4>
        <p>Hi Guys, Wassup!</p>
      </div>
      <div className="profile__btn">
      <Button variant="contained">join</Button>
      </div>
    </div>
    })
    :
    <h1>No friend</h1>
    }
  </div>
  );
};

export default Friend;
