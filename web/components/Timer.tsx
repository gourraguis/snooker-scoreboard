import { useState, useEffect } from 'react';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { startTimerState } from '../atoms/historyState';

const Timer = () => {
  const startTimer = useRecoilValue(startTimerState);
  const [timerText, setTimerText] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (startTimer) {
      setInterval(() => {
        setSeconds((prevSconds) => prevSconds + 1);
      }, 1000);
    }
  }, [startTimer]);

  useEffect(() => {
    setTimerText(Moment.utc(seconds * 1000).format('mm:ss'));
  }, [seconds]);

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-5xl py-4">
        {timerText}
      </h1>
    </div>
  );
};

export default Timer;
