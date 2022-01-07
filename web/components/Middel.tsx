import { useState, useEffect } from 'react';

const Middel = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startTimer, setStartTimer] = useState(true);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (startTimer) setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div
      className="grid grid-row-3 border-[1px] 
        border-primary-w bg-primary-b rounded-lg
        my-8 divide-y divide-primary-w
        "
    >
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-5xl py-4">
          {minutes} : {seconds}
        </h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">LAST 7</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">SCORE 8</h1>
      </div>
    </div>
  );
};

export default Middel;
