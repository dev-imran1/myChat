import React from "react";
import profile from "../assets/profile.png";
import "./chatbox.css";
// import { BsThreeDotsVertical } from "react-icons/bs";
import regimg from "../assets/regimg.png";
import ModalImage from "react-modal-image";
import { Button } from "@mui/material";
import { FiSend } from "react-icons/fi";


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
        {/* message stat */}
        <div className="msgitem">
          <p className="getmsg">Hello</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendmsg">hi</p>
          <time>today:5:15am</time>
        </div>

        {/* message end */}

        {/* image popup stat */}

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

        {/* image popup end */}

        {/* audio stat */}
        <div className="msgitem">
          <p className="getaudio">
            <audio controls></audio>
          </p>
        </div>
        <div className="msgitem">
          <p className="sendaudio">
            <audio controls></audio>
          </p>
        </div>

        {/* audio end */}
        {/* vidio start */}

        <div className="msgitem">
          <p className="getvideo">
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            </video>
          </p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendvideo">
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            </video>
          </p>
          <time>today:5:15am</time>
        </div>

        {/* vidio end */}

        <div className="msgitem">
          <p className="getmsg">Hello</p>
          <time>today:5:15am</time>
        </div>
        <div className="msgitem">
          <p className="sendmsg">hi</p>
          <time>today:5:15am</time>
        </div>
      </div>
      <div className="msgwirtecontainer">
        <div className="msgWrite">
          <input type="text" />
        </div>
        <Button className="msgsend"
          variant="contained"
          color="success"
        >
          <FiSend />
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
