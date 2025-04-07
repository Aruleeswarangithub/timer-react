import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("stopwatch");
  const [quote, setQuote] = useState("Stay focused. Stay determined.");
  const timerRef = useRef(null);

  const countdownDuration = 60 * 1000; // 1 minute

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === "countdown") {
            return Math.max(prevTime - 10, 0);
          } else {
            return prevTime + 10;
          }
        });
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const formatTime = (milliseconds) => {
    const ms = String(milliseconds % 1000).padStart(3, "0").substring(0, 2);
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}:${ms}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === "countdown") setTime(countdownDuration);
    else setTime(0);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setIsRunning(false);
    if (selectedMode === "countdown") {
      setTime(countdownDuration);
      setQuote("Countdown mode. Make every second count.");
    } else {
      setTime(0);
      setQuote("Stay focused. Stay determined.");
    }
  };

  const getProgressWidth = () => {
    if (mode === "countdown") return `${((countdownDuration - time) / countdownDuration) * 100}%`;
    return "100%";
  };

  return (
    <div className={`app ${mode}`}>
      <h1 className="title">⏱️ Animated Timer App</h1>
      <div className="modes">
        <button onClick={() => handleModeChange("stopwatch")} className={mode === "stopwatch" ? "active" : ""}>Stopwatch</button>
        <button onClick={() => handleModeChange("countdown")} className={mode === "countdown" ? "active" : ""}>Countdown</button>
      </div>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartPause}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="quote">💬 <em>{quote}</em></div>
      <div className="progress-bar" style={{ width: getProgressWidth() }}></div>
    </div>
  );
};

export default App;
