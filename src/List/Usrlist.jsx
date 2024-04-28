import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./grouplist.css";
import profile from "../assets/profile.png";
import { Button } from "@mui/material";
// import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from "react-redux";


const Usrlist = () => {
  // const auth = getAuth();
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let [friendRequest, setfriendRequest] = useState([]);
  let logindata = useSelector((state) => state.logeduser.loginuser);



// friend request
  useEffect(() => {
    const userRef = ref(db, "friendRequest/");
    onValue(userRef, (snapshot) => { 
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().whoreciveid + item.val().whosendid)
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
        // if(logindata.uid != item.key){
          arr.push({...item.val(), id: item.key});
        // }
      });
      setUserList(arr);
    });
  }, []);


  // friend request create
  let handelFRequest = (item) => {
    set(push(ref(db, 'friendRequest/')), {
      whosendid: logindata.uid,
      whosendemail: logindata.email,
      whosendimg: logindata.photoURL,
      whoreciveid:item.id,
      whorecivename: item.username,
      whoreciveimg: item.profile_picture
    })
  };

  // remove friend request
  let handelCancelFRequest =(item)=>{
    remove(remove(ref(db, 'friendRequest/',item.id )))
  }

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
            {friendRequest.includes(logindata.uid+item.id)
            ?
              <Button onClick={()=>handelCancelFRequest(item)} variant="contained">
                Cancel
              </Button>

            :
            friendRequest.includes(item.id+logindata.uid)
            ?
            <Button variant="contained">
              Pending
            </Button>
            :
              <Button onClick={()=>handelFRequest(item)} variant="contained">
                +
              </Button>
            
            
            }
            </div>
          </div>
        </div>

        
      ))}
    </div>
  );
};

export default Usrlist;
