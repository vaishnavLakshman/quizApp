import React, { useEffect, useState } from "react";
import LoginPage from "../../LoginPage/LoginPage";
import axios from "axios";
import classes from "./UserHomePage.module.css";
import TriviaHeader from "../../UI/Header/TriviaHeader";
import { Link, useNavigate } from "react-router-dom";

function UserHomePage(props) {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  localStorage.removeItem("quiz");
  localStorage.removeItem("correctAnswers");
  localStorage.removeItem("Final Time");

  useEffect(() => {
    axios.get(`http://localhost:3031/users/` + userId).then((response) => {
      console.log("User data" + JSON.stringify(response.data));
      setUserData(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    });
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <TriviaHeader token={token} />
      </div>
      <div className={classes.optionsContainer}>
        <h1>Welcome {userData.firstName}!</h1>
        <div className={classes.options}>
          <div className={classes.option1}>
            <Link to="/quizHome">
              <div className={classes.tempVisible}>
                <h3>
                  Take<br></br>Quiz
                </h3>
              </div>
            </Link>
          </div>
          <div className={classes.option2}>
            <Link to="/stats">
              <div className={classes.tempVisible}>
                <h3>
                  View<br></br>Results
                </h3>
              </div>
            </Link>
          </div>
          <div className={classes.option3}>
            <Link to="/update">
              <div className={classes.tempVisible}>
                <h3>
                  Update<br></br>Profile
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHomePage;
