import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scoreState, selectedBallState } from '../atoms/ballState';
import { selectedUserState } from '../atoms/selectedUserState';
// import { IBall } from '../types/Ball';

const Controls = () => {
  const [lastBall, setLastBall] = useRecoilState(selectedBallState);
  const [score, setScore] = useRecoilState(scoreState);
  const user = useRecoilValue(selectedUserState);
  const handleRed = () => {
    setLastBall({
      color: 'bg-red-800',
      val: 1,
    });

    // const hadleForm = (e: React.MouseEvent<HTMLElement>) => {
    //   e.preventDefault();
    // };

    if (user.selectedUser) {
      let newScore = score.val + 1;
      setScore({
        val: newScore,
      });
    }
  };
  const handleYellow = () => {
    setLastBall({
      color: 'bg-yellow-400',
      val: 2,
    });
    if (user.selectedUser) {
      let newScore = score.val + 2;
      setScore({
        val: newScore,
      });
    }
  };
  const handleGreen = () => {
    setLastBall({
      color: 'bg-green-600',
      val: 3,
    });
    if (user.selectedUser) {
      let newScore = score.val + 3;
      setScore({
        val: newScore,
      });
    }
  };
  const handleAmber = () => {
    setLastBall({
      color: 'bg-amber-900',
      val: 4,
    });
    if (user.selectedUser) {
      let newScore = score.val + 4;
      setScore({
        val: newScore,
      });
    }
  };
  const handleBlue = () => {
    setLastBall({
      color: 'bg-blue-600',
      val: 5,
    });
    if (user.selectedUser) {
      let newScore = score.val + 5;
      setScore({
        val: newScore,
      });
    }
  };
  const handlePink = () => {
    setLastBall({
      color: 'bg-pink-300',
      val: 6,
    });
    if (user.selectedUser) {
      let newScore = score.val + 6;
      setScore({
        val: newScore,
      });
    }
  };
  const handleBlack = () => {
    setLastBall({
      color: 'bg-black',
      val: 7,
    });
    if (user.selectedUser) {
      let newScore = score.val + 7;
      setScore({
        val: newScore,
      });
    }
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

export default Controls;
