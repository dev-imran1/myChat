import React from "react";
import { Grid } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./rootlayout.css";
import profile from "../assets/profile.png";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const RootLayouts = () => {
  let location = useLocation();
  const auth = getAuth();
  let logindata = useSelector((state)=>state.logeduser.loginuser)

  // console.log(logindata)

  return (
    <>
      <Grid container spacing={0}>
        <Grid xs={2}>
          <div className="navbar">
            <div className="navbar__container">
              <div>
                <img src={profile} alt="" />
                <h5 className="profile__name">{logindata.displayName}</h5>
                <p className="profile__name">{logindata.email}</p>
               
              </div>
              <ul className="icon__box">
                <li>
                  <Link
                    to="home"
                    className={
                      location.pathname == "/chatting-app/home"
                        ? "active"
                        : "icon"
                    }
                  >
                    <IoHomeOutline />
                  </Link>
                </li>
                <li>
                  <Link
                    to="message"
                    className={
                      location.pathname == "/chatting-app/message"
                        ? "active"
                        : "icon"
                    }
                  >
                    <AiOutlineMessage />
                  </Link>
                </li>
                <li>
                  <Link
                    to="notification"
                    className={
                      location.pathname == "/chatting-app/notification"
                        ? "active"
                        : "icon"
                    }
                  >
                    <IoMdNotificationsOutline />
                  </Link>
                </li>
                <li>
                  <Link
                    to="setting"
                    className={
                      location.pathname == "/chatting-app/setting"
                        ? "active"
                        : "icon"
                    }
                  >
                    <IoSettingsOutline />
                  </Link>
                </li>
                <li>
                  <Link
                    to="logout"
                    className={
                      location.pathname == "/chatting-app/logout"
                        ? "active"
                        : "icon"
                    }
                  >
                    <IoIosLogOut />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default RootLayouts;
