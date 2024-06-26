import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import "./grouplist.css";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupList = () => {
  let initialValue = {
    groupname: "",
    grouptagline: "",
  };

  const db = getDatabase();
  let [groups, setGroups] = useState([]);
  let [groupMember, setGroupMermber] = useState([]);
  let [memberGroupList, setMemberGrouplist] = useState([]);
  let [groupInfo, setGroupInfo] = useState([initialValue]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let userData = useSelector((state) => state.logeduser.loginuser);

  let handelClick = () => {
    let { groupname, grouptagline } = groupInfo;
    set(push(ref(db, "mygroup")), {
      groupname: groupname,
      grouptagline: grouptagline,
      adminid: userData.uid,
      adminname: userData.displayName,
      adminimg: userData.photoURL,
    }).then(() => {
      setOpen(false);
    });
  };

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

  const handelJoingroup = (item) => {
    set(push(ref(db, "grouprequest")), {
      adminid: item.adminid,
      adminname: item.adminname,
      groupname: item.groupname,
      groupid: item.groupid,
      username: userData.displayName,
      userid: userData.uid,
      userimg: userData.photoURL,
    });
  };

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

  let handelCancelMember = (item) => {
    console.log("cancel", item), "button items";
    const starCancelRef = ref(db, "grouprequest");
    let reqIds = "";
    onValue(starCancelRef, (snapshot) => {
      snapshot.forEach((items) => {
        if (items.val().groupid == item.groupid) {
          reqIds = items.key;
        }
      });
    });
    remove(ref(db, "grouprequest/" + reqIds));
  };

  let handelGroup = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

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
        <Button className="mybtn" onClick={handleOpen} variant="contained">
          +Group
        </Button>
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
                      onClick={() => handelCancelMember(item)}
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
                    onClick={() => handelJoingroup(item)}
                    variant="contained"
                  >
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))
        : "no data"}
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Create New Group
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={handelGroup}
                fullWidth
                margin="dense"
                id="outlined-basic"
                label="Group Name"
                variant="filled"
                name="groupname"
              />
              <TextField
                onChange={handelGroup}
                fullWidth
                margin="dense"
                id="outlined-basic"
                label="Group Tagline"
                variant="filled"
                name="grouptagline"
              />
              <Button onClick={handelClick} margin="dense" variant="contained">
                Submit
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default GroupList;
