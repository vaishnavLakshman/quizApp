import React, { useCallback, useEffect, useState } from "react";
import classes from "./UpdateProfile.module.css";
import LoginPage from "../../LoginPage/LoginPage";
import TriviaHeader from "../../UI/Header/TriviaHeader";
import axios from "axios";
import { validPassword, validUsername } from "../../../Regex";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Bubble from "../../UI/Bubble/Bubble";

function UpdateProfile(props) {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [userName, setUserName] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState(userData.password);
  const [usernameCriteria, setUsernameCriteria] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState(false);
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordMatch, setpasswordMatch] = useState();
  const navigate = useNavigate();
  let emailPlaceholder = userData.email === "" ? "Email.." : userData.email;

  useEffect(() => {
    console.log("USERDATA : " + JSON.stringify(userData));
  }, []);

  const userNameValidation = useCallback(() => {
    if (userName.length !== 0 && !validUsername.test(userName)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }, [userName]);

  const passWordValidation = useCallback(() => {
    if (password.length > 5 && !validPassword.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const passWordMatch = useCallback(() => {
    if (confPassword !== password) {
      setpasswordMatch(true);
    } else {
      setpasswordMatch(false);
    }
  }, [confPassword]);

  console.log("USERDATA firstName:", JSON.stringify(userData.firstName));
  console.log("USERDATA lastName:", JSON.stringify(userData.lastName));
  console.log("USERDATA userName:", JSON.stringify(userData.username));
  console.log("USERDATA email:", JSON.stringify(userData.email));
  console.log("USERDATA password:", JSON.stringify(userData.password));

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3031/users/` + userData.id, {
        id: userData.id,
        firstName: firstName,
        lastName: lastName,
        password: confPassword,
        email: email,
        username: userName,
        totalGames: userData.totalGames,
        winPercent: userData.winPercent,
        totalGrade: userData.totalGrade,
        currentGame: userData.currentGame,
      })
      .then((response) => {
        console.log("RESPONSE :" + JSON.stringify(response.data));
      });
    message.success("Profile updated successfully!");
    navigate("/user");
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    setPassword("");
    setConfPassword("");
  };

  return (
    <div className={classes.container}>
      <div>
        <TriviaHeader token={token} />
      </div>
      <div className={classes.outerbox}>
        <h1>Update Profile</h1>
        <div className={classes.wrapper}>
          <form onSubmit={submitHandler}>
            <div className={classes.doubleFormbox}>
              <div className={classes.temp}>
                <div className={classes.formbox}>
                  <label>Firstname</label>
                  <input
                    type="text"
                    // value={firstName}
                    placeholder={userData.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes.temp}>
                <div className={classes.formbox}>
                  <label>Lastname</label>
                  <input
                    type="text"
                    // value={lastName}
                    placeholder={userData.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={classes.doubleFormbox}>
              <div className={classes.temp}>
                <div className={classes.formbox2}>
                  <label>Username</label>
                  <input
                    type="text"
                    // value={userName}
                    placeholder={userData.username}
                    onChange={(e) => setUserName(e.target.value)}
                    onFocus={(e) => {
                      userNameValidation();
                    }}
                    onBlur={(e) => {
                      userNameValidation();
                    }}
                  />
                </div>
                {usernameError && (
                  <p className={classes.invalid}>Username is invalid!</p>
                )}
              </div>
              <div className={classes.temp}>
                <div className={classes.formbox3}>
                  <label>Email</label>
                  <input
                    type="email"
                    // value={email}
                    placeholder={emailPlaceholder}
                    onChange={(e) => setEmail(e.target.value)}
                    //   onFocus={(e) => {
                    //     emailValidation();
                    //   }}
                    //   onBlur={(e) => {
                    //     emailValidation();
                    //   }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.doubleFormbox}>
              <div className={classes.temp}>
                <div className={classes.formbox}>
                  <label>Password</label>
                  <input
                    type="password"
                    // value={password}
                    placeholder="Password.."
                    minLength={5}
                    maxLength={12}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => {
                      passWordValidation();
                    }}
                    onBlur={(e) => {
                      passWordValidation();
                    }}
                  />
                </div>
                {passwordError && (
                  <p className={classes.invalid}>Password is invalid!</p>
                )}
              </div>
              <div className={classes.temp}>
                <div className={classes.formbox4}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    // value={confPassword}
                    placeholder="Confirm Password.."
                    minLength={5}
                    maxLength={12}
                    onChange={(e) => setConfPassword(e.target.value)}
                    onFocus={(e) => {
                      passWordMatch();
                    }}
                    onBlur={(e) => {
                      passWordMatch();
                    }}
                  />
                </div>
                {passwordMatch && (
                  <p className={classes.invalid}>Passwords don't match!</p>
                )}
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <Link to="/user">
          <p className={classes.goback}>Go back</p>
        </Link>
      </div>
    </div>
  );
}

export default UpdateProfile;
