import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { selectedBallState } from '../atoms/selectedBallState';

const Balls = () => {
  const [lastBall, setLastBall] = useRecoilState(selectedBallState);
  const handleRed = () => {
    setLastBall({
      color: 'bg-red-800',
      val: 1,
    });
  };
  const handleYellow = () => {
    setLastBall({
      color: 'bg-yellow-400',
      val: 2,
    });
  };
  const handleGreen = () => {
    setLastBall({
      color: 'bg-green-600',
      val: 3,
    });
  };
  const handleAmber = () => {
    setLastBall({
      color: 'bg-amber-900',
      val: 4,
    });
  };
  const handleBlue = () => {
    setLastBall({
      color: 'bg-blue-600',
      val: 5,
    });
  };
  const handlePink = () => {
    setLastBall({
      color: 'bg-pink-300',
      val: 6,
    });
  };
  const handleBlack = () => {
    setLastBall({
      color: 'bg-black',
      val: 7,
    });
  };
  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      <button
        onClick={handleRed}
        className="w-14 h-14 rounded-full bg-red-800"
      ></button>
      <button
        onClick={handleYellow}
        className="w-14 h-14 rounded-full bg-yellow-400"
      ></button>
      <button
        onClick={handleGreen}
        className="w-14 h-14 rounded-full bg-green-600"
      ></button>
      <button
        onClick={handleAmber}
        className="w-14 h-14 rounded-full bg-amber-900"
      ></button>
      <button
        onClick={handleBlue}
        className="w-14 h-14 rounded-full bg-blue-600"
      ></button>
      <button
        onClick={handlePink}
        className="w-14 h-14 rounded-full bg-pink-300"
      ></button>
      <button
        onClick={handleBlack}
        className="w-14 h-14 rounded-full bg-black"
      ></button>
      <RefreshIcon className="w-14 h-14 text-white cursor-pointer" />
    </div>
  );
};

export default Balls;
