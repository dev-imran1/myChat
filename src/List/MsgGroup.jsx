import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import "../List/grouplist.css";
import UserTitle from "../components/UserTitle";
import { RiH1 } from "react-icons/ri";

const MsgGroup = () => {
  const db = getDatabase();
  let [groups, setGroups] = useState([]);
  let [member, setMember] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);

  useEffect(() => {
    const groupRef = ref(db, "mygroup");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if (userData.uid !== item.val().adminid) {
        arr.push({ ...item.val(), id: item.key });
        // }
      });
      setGroups(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "memberlist");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if (item.val().userid == userData.uid) {
        arr.push({ ...item.val(), id: item.key });
        // }
      });
      setMember(arr);
    });
  }, []);

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="Group List" />
      </div>
      {groups.map((item, index) =>
        userData.uid == item.adminid ? (
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
              {/* <h4>{console.log(item.groupid)}</h4> */}
            </div>
            <div className="profile__btn">
              {/* {member.indexOf(item.groupid) !== -1 ? (
                    <>
                      <Button className="mybtn" variant="contained">
                        Pending
                      </Button>
                      <Button className="mybtn" variant="contained">
                        Cancel
                      </Button>
                    </>
                  ) : member.indexOf(item.groupid) !== -1 ? (
                    <Button className="mybtn" variant="contained">
                      Member
                    </Button>
                  ) : (
                    <Button className="mybtn" variant="contained">
                      Join
                    </Button>
                  )} */}
              <Button className="mybtn" variant="contained">
                Admin
              </Button>
            </div>
          </div>
        ) : (
          member.map((mem, a) =>
            userData.uid == mem.userid && item.adminid == mem.adminid && (
              <div key={a} className="main__content">
                <div className="profile__img">
                  <img src={mem.adminimg} alt="" />
                </div>
                <div className="profile__details">
                  <h4>Admin Name: {mem.adminname}</h4>
                  <h4>Group Name: {mem.groupname}</h4>
                  <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Group TagLine :{mem.grouptagline}
                  </p>
                  {/* <h4>{console.log(item.groupid)}</h4> */}
                </div>
                <div className="profile__btn">
                  <Button className="mybtn" variant="contained">
                    MEMBER
                  </Button>
                </div>
              </div>
            )
          )
        )
      )}
    </div>
  );
};

export default MsgGroup;
