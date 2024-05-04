import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {
  let [block, setBlock] = useState([]);
  const db = getDatabase();
  let userData = useSelector((state) => state.logeduser.loginuser);

  useEffect(() => {
    const userRef = ref(db, "block/");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setBlock(arr);
    });
  }, []);


  let handelUnblock =(item)=>{
    remove(remove(ref(db, 'block/',item.id )))
  }

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="Block List" />
        <BsThreeDotsVertical />
      </div>
      {block.map((item, index) => (
        <div key={index} className="main__content">
          <div className="profile__img">
            {item.blockbyid == userData.uid ? (
              <img src={item.blockimg} alt="" />
            ) : (
              <img src={item.blockbyimg} alt="" />
            )}
          </div>
          <div className="profile__details">
            {item.blockbyid == userData.uid ? (
              <h4>{item.blockname}</h4>
            ) : (
              <h4>{item.blockbyname}</h4>
            )}

            {item.blockbyid == userData.uid ? (
             <p> {item.blockid}</p>
            ) : (
              <h4>{item.blockbyid}</h4>
            )}
          </div>
          <div className="profile__btn">
          {item.blockbyid == userData.uid ? (
            <Button onClick={()=>handelUnblock(item)} variant="contained">Unblock</Button>
          ) : (
            <Button variant="contained">Block</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockList;
