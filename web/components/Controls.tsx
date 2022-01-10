import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scoreState, selectedBallState } from '../atoms/ballState';
import { selectedUserState } from '../atoms/selectedUserState';
import { Balls } from '../utils/balls';
import { IBall } from '../types/Ball';

const Controls = () => {
  const [lastBall, setLastBall] = useRecoilState<IBall>(selectedBallState);
  const [score, setScore] = useRecoilState(scoreState);
  const user = useRecoilValue(selectedUserState);
  const handleScore = (ball: any) => {
    setLastBall({
      id: ball.id,
      value: ball.value,
      color: ball.color,
    });
    if (user.selectedUser) {
      let newScore = score.value + 1;
      setScore({
        value: newScore,
      });
    }
  };
  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      {Balls.map((ball) => (
        <button
          key={ball.id}
          value={ball.value}
          onClick={() => handleScore(ball)}
          className={`w-14 h-14 rounded-full ${ball.color}`}
        ></button>
      ))}
      <RefreshIcon className="w-14 h-14 text-white cursor-pointer" />
    </div>
  );
};

export default Controls;
