import React, { useEffect, useState } from "react";
import UserTitle from "../components/UserTitle";
import "./grouplist.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Mygroup = () => {
  const db = getDatabase();

  let [myGroups, setMyGroups] = useState([]);
  let [myGroupsReqList, setMyGroupReqList] = useState([]);
  let [memberReqList, setMymemberReqList] = useState([]);
  let userData = useSelector((state) => state.logeduser.loginuser);
  const [open, setOpen] = useState(false);

  const handleOpen = (group) => {
    const groupRef = ref(db, "grouprequest");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          userData.uid == item.val().adminid &&
          item.val().groupid == group.id
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMyGroupReqList(arr);
    });
    setOpen(true);
  };

  const handelMember = (group) => {
    const memberREf = ref(db, "memberlist");
    onValue(memberREf, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          userData.uid == item.val().adminid &&
          item.val().groupid == group.id
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMymemberReqList(arr);
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const groupRef = ref(db, "mygroup/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userData.uid == item.val().adminid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setMyGroups(arr);
    });
  }, []);

  let handelDelete = (item) => {
    remove(ref(db, "mygroup/"+ item.id));
  };

  const handelCancelMermber = (item) => {
    remove(ref(db, "grouprequest/"+ item.id));
  };

  const handelAcceptMember = (member) => {
    console.log(member)
    set(push(ref(db, "memberlist")), {
      ...member,
    }).then(() => {
      remove(ref(db, "grouprequest/" + member.id));
      setOpen(false);
    });
  };

  return (
    <div className="main__wrapper">
      <div className="title__wrapper">
        <UserTitle className="userTitle" text="My Group" />
        <div></div>
      </div>
      {myGroups && myGroups.length > 0 ? (
        myGroups.map((item, index) => (
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
            </div>
            <div className="profile__btn">
              <div>
                <Button
                  onClick={() => handleOpen(item)}
                  className="mybtn"
                  variant="contained"
                >
                  Request
                </Button>
                <Button onClick={()=>handelMember(item)} className="mybtn" variant="contained">
                  Members
                </Button>
                <Button
                  className="mybtn"
                  onClick={() => handelDelete(item)}
                  variant="contained"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3 className="nogroup">No Group...</h3>
      )}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Group Request List</h2>
            {/* <Button onClick={handleClose}>Close Child Modal</Button> */}
            {myGroupsReqList.map((item) => (
              <>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.userimg} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.username}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.userid}
                          </Typography>
                          <br />
                          {"Want's to join your group…"}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              columnGap: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              onClick={() => handelAcceptMember(item)}
                              style={{ marginBottom: "15px" }}
                              color="success"
                              variant="contained"
                            >
                              accept
                            </Button>
                            <Button
                              onClick={() => handelCancelMermber(item)}
                              color="error"
                              variant="contained"
                            >
                              X
                            </Button>
                          </div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </>
            ))}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Mygroup;
