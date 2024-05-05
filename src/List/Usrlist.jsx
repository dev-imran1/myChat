import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
// import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Usrlist = () => {
  // const auth = getAuth();
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let [friendRequest, setfriendRequest] = useState([]);
  let [friends, setfriends] = useState([]);
  let [block, setBlock] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);

  // console.log(userData)

  // friend request
  useEffect(() => {
    const userRef = ref(db, "friendRequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreciveid + item.val().whosendid);
      });
      setfriendRequest(arr);
    });
  }, []);

  // user show
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  // freinds list
  useEffect(() => {
    const userRef = ref(db, "friends/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreciveid + item.val().whosendid);
      });
      setfriends(arr);
    });
  }, []);

  // friend request create
  let handelFRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      whosendid: userData.uid,
      whosendname: userData.displayName,
      whosendemail: userData.email,
      whosendimg: userData.photoURL,
      whoreciveid: item.id,
      whorecivename: item.username,
      whoreciveimg: item.profile_picture,
    });
  };

  // block user
  useEffect(() => {
    const userRef = ref(db, "block/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().blockid + item.val().blockbyid);
      });
      setBlock(arr);
    });
  }, []);
  console.log(block);
  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="User List" />
        <BsThreeDotsVertical />
      </div>
      {userList.map((item, index) => (
        <div key={index}>
          <div className="main__content">
            <div className="profile__img">
              <img src={item.profile_picture} alt="" />
            </div>
            <div className="profile__details">
              <h4>{item.username}</h4>
              <p>{item.email}</p>
            </div>
            <div className="profile__btn">
              {friendRequest.includes(userData.uid + item.id) ? (
                <Button variant="contained">Friend Request</Button>
              ) : friendRequest.includes(item.id + userData.uid) ? (
                <Button variant="contained">Pending</Button>
              ) : friends.includes(item.id + userData.uid) ||
                friends.includes(userData.uid + item.id) ? (
                <div>
                  <Button variant="contained">friend</Button>
                </div>
              ) : block.includes(userData.uid + item.id) ||
                block.includes(item.id + userData.uid) ? (
                <div>
                  <Button variant="contained" color="error">
                    Block
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handelFRequest(item)}
                  variant="contained"
                >
                  +
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Usrlist;
