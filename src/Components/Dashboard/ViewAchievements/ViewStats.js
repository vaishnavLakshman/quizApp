import React, { useEffect, useState } from "react";
import classes from "./ViewStats.module.css";
import "./MuiTabs.css";
import TriviaHeader from "../../UI/Header/TriviaHeader";
import { Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewStats(props) {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId"))
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [previousGameGrade, setPreviousGameGrade] = useState("~");
  const [previousGameWinPercent, setPreviousGameWinPercent] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:3031/users/` + userId).then((response) => {
      console.log("User data" + JSON.stringify(response.data));
      // setUserData(response.data);
    });
    if (userData.currentGame.correctAnswers === 0) {
      setPreviousGameWinPercent(0);
      setPreviousGameGrade("~");
    } else {
      setPreviousGameWinPercent(
        parseFloat(
          (userData.currentGame.correctAnswers /
            userData.currentGame.questions) *
            100
        ).toFixed(2)
      );
      if (previousGameWinPercent <= 100 && previousGameWinPercent >= 70) {
        setPreviousGameGrade("A");
      } else if (previousGameWinPercent < 70 && previousGameWinPercent >= 50) {
        setPreviousGameGrade("B");
      } else if (previousGameWinPercent < 50 && previousGameWinPercent >= 30) {
        setPreviousGameGrade("C");
      } else {
        setPreviousGameGrade("D");
      }
    }
  }, [currentTabIndex]);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className={classes.container}>
      <div>
        <TriviaHeader token={token} />
      </div>
      <div className={classes.tabs}>
        <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
          <Tab label="Cumulative Result" />
          <Tab label="Previous Result" />
        </Tabs>
      </div>
      <div className={classes.resultContainer}>
        {currentTabIndex === 0 && (
          <div className={classes.results}>
            <div className={classes.individualData}>
              <h3>Total Quizzes attended :</h3>
              <h4>{userData.totalGames}</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Win Rate (%) :</h3>
              <h4>{userData.winPercent}%</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Grade :</h3>
              <div className={classes.grade}>
                <h4>{userData.totalGrade ?? "~"}</h4>
              </div>
            </div>
          </div>
        )}
        {currentTabIndex === 1 && (
          <div className={classes.results}>
            <div className={classes.individualData}>
              <h3>Total Questions :</h3>
              <h4>{userData.currentGame.questions}</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Category :</h3>
              <h4>{userData.currentGame.category ?? "~"}</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Difficulty :</h3>
              <h4>{userData.currentGame.difficulty ?? "~"}</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Correct Answers :</h3>
              <h4>{userData.currentGame.correctAnswers}</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Win Rate (%) :</h3>
              <h4>{previousGameWinPercent}%</h4>
            </div>
            <div className={classes.individualData}>
              <h3>Grade :</h3>
              <div className={classes.grade}>
                <h4>{previousGameGrade}</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStats;
