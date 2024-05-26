import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import '../List/grouplist.css'
import UserTitle from "../components/UserTitle";

const MsgGroup = () => {
  const db = getDatabase();
  let [groups, setGroups] = useState([]);
  let [groupMember, setGroupMermber] = useState([]);
  let [memberGroupList, setMemberGrouplist] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);

  useEffect(() => {
    const groupRef = ref(db, "mygroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid !== item.val().adminid) {
          arr.push({ ...item.val(), groupid: item.key });
        }
      });
      setGroups(arr);
    });
  }, []);

  useEffect(() => {
    const grouplists = ref(db, "grouprequest/");
    onValue(grouplists, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userid == userData.uid) {
          arr.push(item.val().groupid);
          // arr.push({ ...item.val().groupid, id: item.key });
        }
      });
      setGroupMermber(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "memberlist/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userid == userData.uid) {
          arr.push(item.val().groupid);
        }
      });
      setMemberGrouplist(arr);
    });
  }, []);

  return (
    <div className="main__wrapper">
    <div className="title__wrapper">
      <UserTitle className="userTitle" text="Group List" />
      
    </div>
    {groups && groups.length > 0
        ? groups.map((item, index) => (
            <div key={index} className="main__content">
              <div className="profile__img">
                <img src={item.adminimg} alt="" />
              </div>
              <div className="profile__details">
                <h4>Admin Name: {item.adminname}</h4>
                <h4>Group Name: {item.groupname}</h4>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Group TagLine :{item.grouptagline}
                </p>
                <h4>{console.log(item.groupid)}</h4>
              </div>
              <div className="profile__btn">
                {groupMember.indexOf(item.groupid) !== -1 ? (
                  <>
                    <Button className="mybtn" variant="contained">
                      Pending
                    </Button>
                    <Button
                      className="mybtn"
                    
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </>
                ) : memberGroupList.indexOf(item.groupid) !== -1 ? (
                  <Button className="mybtn" variant="contained">
                    Member
                  </Button>
                ) : (
                  <Button
                    className="mybtn"
                    
                    variant="contained"
                  >
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))
        : "no data"}
   
  </div>
  );
};

export default MsgGroup;
