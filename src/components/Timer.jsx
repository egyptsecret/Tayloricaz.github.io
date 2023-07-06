import { toString } from "lodash/fp";
import { useEffect, useRef, useState } from "react";

export const Timer = ({ startTrigger, onTimeEnd }) => {
  const [num, setNum] = useState(900);
  const [pause, setPause] = useState(false);
  const intervalRef = useRef();

  const decreaseNum = () => {
    setNum((prev) => prev - 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const handleClick = () => {
    !pause
      ? clearInterval(intervalRef.current)
      : (intervalRef.current = setInterval(decreaseNum, 1000));

    setPause((prev) => !prev);
  };

  const mins = (num / 60) | 0;
  const secs = num % 60 | 0;

  useEffect(() => {
    if (num === 0) {
      onTimeEnd();
      setPause(true);
      clearInterval(intervalRef.current);
    }
  }, [num]);

  return (
    <div>
      <div className="red-tv-font">
        {mins} : {toString(secs).length < 2 ? "0" + secs : secs}
      </div>
      {num > 0 && (
        <button onClick={handleClick}>{pause ? "Run" : "Pause"}</button>
      )}
    </div>
  );
};
