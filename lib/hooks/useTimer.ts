import { useState, useEffect } from 'react';

export const useTimer = (seconds: number) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const init = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const _intervalId = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(_intervalId);
  };

  const reset = () => {
    setIntervalId(undefined);
    setCurrentTime(0);
    setIsFinished(false);
  };

  useEffect(() => {
    if (currentTime >= seconds) {
      clearInterval(intervalId);
      setIsFinished(true);
      setIntervalId(undefined);
    }
  }, [currentTime]);

  return {
    init,
    reset,
    currentTime,
    isFinished,
  };
};
