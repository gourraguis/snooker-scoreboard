import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { Balls } from '../utils/balls';
import { currentPlayerIdState, playersState } from '../atoms/userState';
import { ballsState } from '../atoms/ballState';

const Controls = () => {
  const [currentPlayerId, setCurrentPlayerId] =
    useRecoilState(currentPlayerIdState);
  const [playerState, setPlayerState] = useRecoilState(playersState);
  const [ballState, setBallState] = useRecoilState(ballsState);
  const handleScore = (ball: any) => {
    let newScore = ball.value + ballState.score;
    setBallState({
      id: ball.id,
      color: ball.color,
      value: ball.value,
      score: newScore,
    });
  };

  const handleUser = () => {
    let next;
    if (currentPlayerId === playerState[0].id) next = playerState[1].id;
    else next = playerState[0].id;
    setCurrentPlayerId(next);
  };
  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      {Balls.map((ball) => (
        <button
          key={ball.id}
          value={ball.value}
          onClick={() => handleScore(ball)}
          className="w-14 h-14 rounded-full"
          style={{ backgroundColor: ball.color }}
        ></button>
      ))}

      <RefreshIcon
        onClick={handleUser}
        className="w-14 h-14 text-white cursor-pointer"
      />
    </div>
  );
};

export default Controls;
