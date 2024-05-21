import React, { useEffect, useMemo, useState } from "react";
import classes from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { validPassword, validUsername } from "../../Regex";
import axios from "axios";
import { message } from "antd";

function LoginPage(props) {
  const [name, setName] = useState("");
  const [passWord, setPassword] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [token, setToken] = useState();
  const [usernameData, setUsernameData] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3031/users").then((response) => {
      console.log("Fetched Data : " + JSON.stringify(response.data));
      setData(response.data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let dataFilter = data.filter((item) => {
      return item.username === name;
    });
    if (data) {
      if (dataFilter.length === 0) {
        message.error("Invalid Credentials");
      } else {
        data
          .filter((item) => {
            return item.username === name;
          })
          .map(async function (k) {
            if (passWord === k.password) {
              {
                await axios
                  .get("http://localhost:8081/login")
                  .then((response) => {
                    console.log("token" + JSON.stringify(response.data));
                    setToken(response.data.token);
                    sessionStorage.setItem(
                      "token",
                      JSON.stringify(response.data.token)
                    );
                    props.handleCallback(response.data.token);
                  });
                localStorage.setItem("userId", JSON.stringify(k.id));
                navigate("/user");
              }
            } else {
              message.error("Invalid Credentials");
              console.log("PASSWORD ERROR");
            }
          });
      }
    } else {
      message.error("No Data found!");
    }
    // if (usernameData === false) {
    //   message.error("Invalid Credentials!");
    //   console.log("USERNAME ERROR");
    // }
    setName("");
    setPassword("");
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.blankSpace}>
        <Link to="/">
          <h1>TRIVIA</h1>
        </Link>
      </div>
      <div className={classes.formData}>
        <div className={classes.loginForm}>
          <h1>Login</h1>
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.formbox}>
              <label>Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                onFocus={(e) => {
                  setUsernameError(false);
                }}
                onBlur={(e) => {
                  if (!validUsername.test(name)) {
                    setUsernameError(true);
                  }
                }}
                placeholder="Username.."
              />
              {usernameError && <p>Username is invalid!</p>}
            </div>

            <div className={classes.formbox2}>
              <label>Password</label>
              <input
                type="password"
                value={passWord}
                minLength={5}
                maxLength={12}
                onChange={(e) => setPassword(e.target.value)}
                required
                onFocus={(e) => {
                  setPasswordError(false);
                }}
                onBlur={(e) => {
                  if (!validPassword.test(passWord)) {
                    setPasswordError(true);
                  }
                }}
                placeholder="Password.."
              />
              {passwordError && <p>Password is invalid!</p>}
            </div>

            <button>Submit</button>

            <div className={classes.signup}>
              <Link to="/signup">
                <p>Ain't got a profile? Sign up here.</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
