import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const FriendRequest = () => {
  let userData = useSelector((state) => state.logeduser.loginuser);
  let [friends, setfriends] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const userRef = ref(db, "friendRequest/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid == item.val().whoreciveid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setfriends(arr);
    });
  }, []);

  let handelCancelFRequest = (item) => {
    remove(ref(db, "friendRequest/", item.id));
  };

  let handelAccept = (item) => {
    set(push(ref(db, "friends/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/", item.id));
    });
  };

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="Friend Request" />
        <BsThreeDotsVertical />
      </div>
      {friends.length > 0 ? (
        friends.map((item, index) => (
          <div key={index} className="main__content">
            <div className="profile__img">
              <img src={item.whosendimg} alt="" />
            </div>
            <div className="profile__details">
              <h4>{item.whosendname}</h4>
              <p>{item.whosendemail}</p>
            </div>
            <div className="profile__btn">
              <Button
                variant="contained"
                color="success"
                onClick={() => handelAccept(item)}
              >
                +
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handelCancelFRequest(item)}
              >
                -
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="nogroup">No Firend Request...</h1>
      )}
    </div>
  );
};

export default FriendRequest;
