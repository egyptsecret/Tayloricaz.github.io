import { toString } from "lodash/fp";
import { useEffect, useRef, useState } from "react";

export const Timer = ({ stopTimer, restartTimer }) => {
  const [num, setNum] = useState(0);
  const [pause, setPause] = useState(false);
  const intervalRef = useRef();

  const increaseNum = () => {
    setNum((prev) => prev + 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(increaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    !pause
      ? clearInterval(intervalRef.current)
      : (intervalRef.current = setInterval(increaseNum, 1000));

    setPause((prev) => !prev);
  };

  const mins = (num / 60) | 0;
  const secs = num % 60 | 0;

  useEffect(() => {
    if (stopTimer) {
      setPause(true);
      clearInterval(intervalRef.current);
    }
  }, [stopTimer]);

  useEffect(() => {
    setNum(0);
  }, [restartTimer]);
  return (
    <div>
      <div className="red-tv-font">
        {mins} : {toString(secs).length < 2 ? "0" + secs : secs}
      </div>
      <button onClick={handleClick}>{pause ? "Resume" : "Pause"}</button>
    </div>
  );
};
