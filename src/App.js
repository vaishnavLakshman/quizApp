import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Homepage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserHomePage from "./Components/Dashboard/UserHomePage/UserHomePage";
import SignupPage from "./Components/LoginPage/SignupPage";
import TriviaHeader from "./Components/UI/Header/TriviaHeader";
import UpdateProfile from "./Components/Dashboard/UpdateProfile/UpdateProfile";
import ViewStats from "./Components/Dashboard/ViewAchievements/ViewStats";
import { useEffect, useState } from "react";
import QuizHomePage from "./Components/Dashboard/Quiz/QuizHome/QuizHomePage";
import QuizPage from "./Components/Dashboard/Quiz/QuizPage/QuizPage";
import Stopwatch from "./Components/Dashboard/Quiz/StopWatch/Stopwatch";
import ResultPage from "./Components/Dashboard/Quiz/Result/ResultPage";
import Bubble from "./Components/UI/Bubble/Bubble";

function App() {
  const [token, setToken] = useState();

  // useEffect(() => {
  //   setToken(JSON.parse(sessionStorage.getItem("token")));
  //   console.log("APP JS HERE!!");
  // }, [token]);
  // const token = JSON.parse(sessionStorage.getItem("token"));
  // handleCallback={token}

  const handleCallback = (data) => {
    return setToken(data);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage handleCallback={handleCallback} />}
          />
          <Route
            path="/user"
            element={token ? <UserHomePage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/header"
            element={token ? <TriviaHeader /> : <Navigate to="/login" />}
          />
          <Route
            path="/update"
            element={token ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/stats"
            element={token ? <ViewStats /> : <Navigate to="/login" />}
          />
          <Route
            path="/quizHome"
            element={token ? <QuizHomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/quiz"
            element={token ? <QuizPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/result"
            element={token ? <ResultPage /> : <Navigate to="/login" />}
          />
          <Route path="/stop" element={<Stopwatch />} />
          <Route path="/bubble" element={<Bubble />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
