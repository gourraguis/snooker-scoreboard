import { useState, useEffect } from 'react';
import Moment from 'moment';
import { useRecoilValue } from 'recoil';
import { startedAtState } from '../atoms/historyState';

const Timer = () => {
  const startedAt = useRecoilValue(startedAtState);
  const [timerText, setTimerText] = useState('');

  useEffect(() => {
    if (startedAt) {
      setInterval(() => {
        let currentTime = Moment();
        setTimerText(Moment(currentTime).subtract(startedAt).format('mm:ss'));
      }, 1000);
    }
  }, [startedAt]);

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-5xl py-4">
        {timerText}
      </h1>
    </div>
  );
};

export default Timer;
