import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../pages/reglog.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  let [text, setText] = useState("");

  let handelForgot = (e) => {
    setText(e.target.value);
  };

  let handelForgotClick = () => {
    sendPasswordResetEmail(auth, text)
      .then(() => {
        navigate("/login");
      })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
        
      // });
  };

  return (
    <div className="forgot">
      <TextField
        onChange={handelForgot}
        id="outlined-basic"
        label="Forgot Password"
        variant="outlined"
        type="email"
      />
      <Button onClick={handelForgotClick} variant="contained">
        Contained
      </Button>
    </div>
  );
};

export default ForgotPassword;
