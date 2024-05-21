import React, { useState, useEffect, useCallback } from "react";
import "./Stopwatch.css";
import { useAsyncError } from "react-router-dom";

function Stopwatch(props) {
  // state to store time
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState();
  console.log("PROPSS :" + JSON.stringify(props));

  useEffect(() => {
    let intervalId;
    setStopTime();
    setIsRunning(props.run);
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time, props]);

  const setStopTime = useCallback(() => {
    if (!isRunning) {
      setFinalTime({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
      localStorage.setItem("Final Time", JSON.stringify(finalTime));
      console.log("I GET INSIDE AS WELL!!!");
    }
    console.log("I GET IN DIS!!");
  }, [isRunning]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        {/* :
        {milliseconds.toString().padStart(2, "0")} */}
      </p>
      {/* <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
      </div> */}
    </div>
  );
}

export default Stopwatch;
