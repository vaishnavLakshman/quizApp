import React from "react";
import classes from "./TriviaHeader.module.css";
import { useNavigate } from "react-router-dom";

function TriviaHeader(props) {
  const token = props.token;
  const navigate = useNavigate();

  const redirectHandler = () => {
    if (!token) {
      navigate("/");
    } else {
      navigate("/user");
    }
  };

  const logoutHandler = () => {
    console.log("INSIDE LOGOUT");
    navigate("/");
    localStorage.removeItem("userData");
    localStorage.removeItem("userId");
    localStorage.removeItem("quiz");
    localStorage.removeItem("correctAnswers");
    localStorage.removeItem("Final Time");
    sessionStorage.removeItem("token");
  };

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <h1 onClick={redirectHandler}>TRIVIA</h1>
      </div>
      <div className={classes.logout}>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  );
}

export default TriviaHeader;
