import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import { startedAtState } from '../atoms/historyState';

const Timer = () => {
  const startedAt = useRecoilValue(startedAtState);
  const [timerText, setTimerText] = useState('00:00');

  useEffect(() => {
    if (startedAt) {
      setInterval(() => {
        setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'));
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
