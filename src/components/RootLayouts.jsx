import { Grid } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './rootlayout.css';
import profile from '../assets/profile.png';
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";


const RootLayouts = () => {
  return (
    <>

 <Grid container spacing={0}>
        <Grid  xs={2}>
           <div className='navbar'>
            <div className="navbar__container">
              <div>
                <img src={profile} alt="" />
                <h4 className='profile__name'>Imran Hossian</h4>
              </div>
              <ul className='icon__box'>
                <li>
                <Link to='home'>
                 <IoHomeOutline />
                </Link>
                </li>
                <li>
                <Link to='message'>
                  <AiOutlineMessage />
                </Link>
                </li>
                <li>
                <Link to='notification'>
                  <IoMdNotificationsOutline />
                </Link>
                </li>
                <li>
                <Link to='setting'>
                  <IoSettingsOutline />
                </Link>
                </li>
                <li>
                <Link to='logout'>
                  <IoIosLogOut />
                </Link>
                </li>
              </ul>
            </div>
           </div>
        </Grid>
        <Grid  xs={10}>
          <Outlet />
        </Grid>
</Grid>


    </>
  )
}

export default RootLayouts