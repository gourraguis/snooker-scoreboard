import { useState, useEffect } from 'react';
import Moment from 'moment';

const Timer = () => {
  const [timer, setTimer] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(true);

  // todo: refactor this to use createdAt instead of tracking seconds
  useEffect(() => {
    const myInterval = setInterval(() => {
      if (startTimer) setSeconds(seconds + 1);
      const formatted = Moment.utc(seconds * 1000).format('mm:ss');
      setTimer(formatted);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-5xl py-4">{timer}</h1>
    </div>
  );
};

export default Timer;
