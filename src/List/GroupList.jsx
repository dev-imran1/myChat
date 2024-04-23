import React from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from '../assets/profile.png'
import { Button } from "@mui/material";

const GroupList = () => {
  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="Group List" />
        <BsThreeDotsVertical />
      </div>
      <div className="main__content">
        <div className="profile__img">
          <img src={profile} alt="" />
          <img src="https://i.ibb.co/F0vjXj8/images.png"  alt="" />
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

export default GroupList;
