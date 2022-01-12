import { useState, useEffect } from 'react';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { startTimerState } from '../atoms/historyState';

const Timer = () => {
  const startTimer = useRecoilValue(startTimerState);
  const [timer, setTimer] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval: any;
    if (startTimer) {
      myInterval = setInterval(() => {
        setSeconds((prevSconds) => prevSconds + 1);
      }, 1000);
    } else if (!startTimer) {
      clearInterval(myInterval);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [startTimer]);

  useEffect(() => {
    setTimer(Moment.utc(seconds * 1000).format('mm:ss'));
  }, [seconds]);

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-5xl py-4">{timer}</h1>
    </div>
  );
};

export default Timer;
