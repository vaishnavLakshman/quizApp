import React, { useCallback, useEffect, useState } from "react";
import classes from "./Signup.module.css";
import { validPassword, validUsername } from "../../Regex";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import Bubble from "../UI/Bubble/Bubble";

function SignupPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [usernameCriteria, setUsernameCriteria] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3031/users").then((response) => {
      console.log("data from json file: " + JSON.stringify(response.data));
      setData(response.data);
    });
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
    if (confirmPassword !== password) {
      setpasswordMatch(true);
    } else {
      setpasswordMatch(false);
    }
  }, [confirmPassword, password]);

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const existingUsername = data.filter((item) => {
      return item.username === userName;
    });
    console.log("if any" + existingUsername);
    if (existingUsername.length !== 0) {
      message.warning("Username already exists!");
    } else if (password !== confirmPassword) {
      message.warning("The passwords do no match!");
    } else {
      axios
        .post("http://localhost:3031/users", {
          id: data.length,
          firstName: firstName,
          lastName: lastName,
          password: confirmPassword,
          email: "",
          username: userName,
          totalGames: 0,
          winPercent: 0,
          totalGrade: null,
          currentGame: {
            questions: 0,
            correctAnswers: 0,
            category: null,
            difficulty: null,
          },
        })
        .then((response) => {
          console.log("reesponse" + response);
          axios.get("http://localhost:3031/users").then((response) => {
            console.log("data from json" + JSON.stringify(response.data));
          });
        });

      message.success("Signed Up successfully, " + firstName + " !");
      navigate("/login");
    }
    setFirstName("");
    setLastName("");
    setUserName("");
    setConfirmPassword("");
    setPassword("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.formData}>
        <div className={classes.loginbox}>
          <h2>SIGNUP</h2>
          <div className={classes.forms}>
            <form onSubmit={signupSubmitHandler}>
              <div className={classes.formbox}>
                <label>FirstName</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Firstname.."
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={classes.formbox}>
                <label>LastName</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Lastname.."
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className={classes.formbox}>
                <label>UserName</label>
                <input
                  type="text"
                  value={userName}
                  placeholder="Username.."
                  onChange={(e) => {
                    setUserName(e.target.value);
                    userNameValidation();
                  }}
                  onFocus={(e) => {
                    setUsernameCriteria(true);
                  }}
                  onBlur={(e) => {
                    userNameValidation();
                    setUsernameCriteria(false);
                  }}
                  required
                />

                {usernameError && <p>Username is invalid!</p>}
              </div>
              <div className={classes.formbox}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password.."
                  minLength={5}
                  maxLength={12}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    passWordValidation();
                  }}
                  onFocus={(e) => {
                    // passWordValidation();
                    setPasswordCriteria(true);
                  }}
                  onBlur={(e) => {
                    passWordValidation();
                    setPasswordCriteria(false);
                  }}
                  required
                />

                {passwordError && <p>Password is invalid!</p>}
              </div>
              <div className={classes.formbox}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password.."
                  minLength={5}
                  maxLength={12}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    passWordMatch();
                  }}
                  // onFocus={(e) => {
                  //    passWordMatch();
                  // }}
                  onBlur={(e) => {
                    passWordMatch();
                  }}
                  required
                />
                {passwordMatch && <p>Passwords don't match!</p>}
              </div>
              <button>SUBMIT</button>
              <div className={classes.signin}>
                <Link to="/login">
                  <p>Sign In</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {usernameCriteria && (
        <div className={classes.criteria1}>
          <Bubble
            data={
              <ul>
                <li>Username must have a period character.</li>
                <li>Username must have a minimum of 10 characters.</li>
              </ul>
            }
          />
        </div>
      )}
      {passwordCriteria && (
        <div className={classes.criteria2}>
          <Bubble
            data={
              <ul>
                <li>Password can have special characters.</li>
                <li>Password must have a minimum of 5 characters.</li>
                <li>Password must only have maximum of 12 characters.</li>
              </ul>
            }
          />
        </div>
      )}
    </div>
  );
}

export default SignupPage;
