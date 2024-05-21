import React, { useState } from "react";
import classes from "./QuizHomePage.module.css";
import TriviaHeader from "../../../UI/Header/TriviaHeader";
import axios from "axios";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "../../../../images/timer.gif";

function QuizHomePage(props) {
  const [token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("token"))
  );
  const [questions, setQuestions] = useState();
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [answers, setAnswers] = useState();
  const [setup, setSetup] = useState(true);
  const [open, setOpen] = useState(true);
  const [buttonState, setButtonState] = useState(true);
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  const setupHandler = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=` +
          questions +
          `&category=` +
          category +
          `&difficulty=` +
          difficulty +
          `&type=multiple`
      )
      .then((res) => {
        console.log("QUIZ : " + JSON.stringify(res.data.results));
        localStorage.setItem("quiz", JSON.stringify(res.data.results));
        setQuiz(res.data.results);
      });
    axios.get("http://localhost:3031/answers").then((res) => {
      setAnswers(res.data);
    });
    setSetup(false);
    setTimeout(() => {
      setButtonState(false);
      setOpen(false);
    }, 3000);
  };

  const quizHandler = () => {
    if (answers.length) {
      for (let i = 1; i < answers.length + 1; i++) {
        axios.delete(`http://localhost:3031/answers/` + i).then((res) => {
          console.log("Response", JSON.stringify(res.data));
        });
      }
    }
    navigate("/quiz", { state: quiz });
  };

  const resetHandler = () => {
    setSetup(true);
    setOpen(true);
    setButtonState(true);
  };

  return (
    <div className={classes.container}>
      <div>
        <TriviaHeader token={token} />
      </div>
      <div className={classes.quizHomeContainer}>
        <h1>Take a Quiz</h1>
        {setup ? (
          <div className={classes.formBox}>
            <form onSubmit={setupHandler}>
              <div className={classes.selections}>
                <label>Total Questions</label>
                <input
                  type="number"
                  min={5}
                  max={20}
                  onChange={(e) => setQuestions(e.target.value)}
                  required
                />
              </div>
              <div className={classes.selections}>
                <label>Category</label>
                <select
                  name="Category"
                  className={classes.selectbox}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                >
                  <option disabled selected value>
                    Select a category..
                  </option>
                  <option value="9">General Knowledge</option>
                  <option value="17">Science & Nature</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                </select>
              </div>
              <div className={classes.selections}>
                <label>Difficulty</label>
                <select
                  name="Difficulty"
                  className={classes.selectbox}
                  onChange={(event) => setDifficulty(event.target.value)}
                  required
                >
                  <option disabled selected value>
                    Select difficulty level..
                  </option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button>Submit</button>
            </form>
          </div>
        ) : (
          <div className={classes.resultBox}>
            <h3>Your Quiz has been setup!</h3>
            <button onClick={quizHandler} disabled={buttonState}>
              Proceed
            </button>
            <p onClick={resetHandler}>Setup Again?</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizHomePage;
