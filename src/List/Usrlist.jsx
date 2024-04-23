import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
// import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const Usrlist = () => {
  // const auth = getAuth();
  const db = getDatabase();
  let [userList, setUserList] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item =>{
        arr.push(item.val());
      })
      setUserList(arr)
    });
    console.log(userList)
  },[]);

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="User List" />
        <BsThreeDotsVertical />
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

export default Usrlist;
