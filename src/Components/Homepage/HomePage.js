import React from "react";
import classes from "./HomePage.module.css";
import { Link } from "react-router-dom";

function HomePage(props) {
  return (
    <div className={classes.whole}>
      <div className={classes.contentBox}>
        <div className={classes.leftBox}>
          <h1>TRIVIA</h1>
          <div className={classes.writeup}>
            "Knowledge becomes power only when we put it into some use"<br></br>
            <br></br>
            <b>Trivia</b> is a space for you to check your intelligence and find
            how upto date you are with the rest of the world. Dive in to Trivia
            and explore the world of fun learning.
          </div>
          <div className={classes.signup}>
            <Link to="/signup">
              <div className={classes.signupLink}>
                New to Trivia? Register Here
              </div>
            </Link>
          </div>
        </div>
        <div className={classes.rightBox}>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
