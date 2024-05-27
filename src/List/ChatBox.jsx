import React from "react";
import profile from "../assets/profile.png";
import "./chatbox.css";
// import { BsThreeDotsVertical } from "react-icons/bs";
import regimg from "../assets/regimg.png";
import ModalImage from "react-modal-image";

const ChatBox = () => {
  return (
    <div className="chatbox">
      <div className="profile">
        <div className="signal">
          <img src={profile} alt="" />
          <div className="round"></div>
        </div>
        <div className="profile__name">
          <h3 className="name">Md imran hossain</h3>
          <h3 className="name">online</h3>
        </div>
      </div>
      <div className="msgbox">
        {/* <div className="msgitem">
        <p className="getmsg">Hello</p>
        <time>today:5:15am</time>
        </div>
        <div className="msgitem">
        <p className="sendmsg">hi</p>
        <time>today:5:15am</time>
        </div> */}
        <div className="msgitem">
          <p className="sendimg">
            <ModalImage small={regimg} large={regimg} alt="Hello World!" />
          </p>
        </div>
        <div className="msgitem">
          <p className="getimg">
            <ModalImage small={regimg} large={regimg} alt="Hello World!" />
          </p>
        </div>
        <div className="msgitem">
          <p className="getmsg">Hello</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendmsg">hi</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="getmsg">Hello</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendmsg">hi</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="getmsg">Hello</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendmsg">hi</p>
          <time>today:5:15am</time>
        </div>
      </div>
      <div>31 minutes</div>
    </div>
  );
};

export default ChatBox;
