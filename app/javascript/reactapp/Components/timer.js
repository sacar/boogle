import React, {useState, useEffect} from 'react';
const Timer = (props) => {
    const [secondsLeft, setSecondsLeft] = useState(180);
    
    useEffect(() => {
      if (secondsLeft > 0) {
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      } else {
        props.timeUp();
      }
    });
  
    const formatTimer = (time) => {
      let minutes = Math.floor(time / 60);
      let seconds = time - minutes * 60;
      seconds = seconds.toString();
      // padding the seconds value
      if (seconds.length < 2) {
        seconds = ("00" + seconds).slice(-2);
      }
  
      return minutes + ":" + seconds;
    };
  
    return (
      <div className="row justify-content-center ">
        <span style={{ marginRight: "5px" }}>Time Remaining: </span>{" "}
        {formatTimer(secondsLeft)}
      </div>
    );
  };

  export default Timer;