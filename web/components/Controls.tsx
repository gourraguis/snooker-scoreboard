import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { Balls } from '../utils/balls';
import { currentPlayerIdState, playersState } from '../atoms/userState';
import { lastBallsState, scoreState } from '../atoms/ballState';

const Controls = () => {
  const [currentPlayerId, setCurrentPlayerId] =
    useRecoilState(currentPlayerIdState);
  const [playerState, setPlayerState] = useRecoilState(playersState);
  const [ballState, setBallState] = useRecoilState(lastBallsState);
  const [score, setScore] = useRecoilState(scoreState);
  const handleScore = (ball: any) => {
    let newScore = ball.value + score.value;
    setBallState({
      id: ball.id,
      color: ball.color,
      value: ball.value,
    });
    setScore({ value: newScore });
  };

  const switchPlayer = () => {
    const currentPlayer = playerState.find(({ id }) => currentPlayerId === id)!;
    const newScore = currentPlayer.score + score.value;
    setPlayerState([
      {
        ...currentPlayer,
        score: newScore,
      },
      ...playerState.filter(({ id }) => currentPlayerId !== id),
    ]);
    setScore({ value: 0 });
    const nextPlayer =
      currentPlayerId === playerState[0].id
        ? playerState[1].id
        : playerState[0].id;
    setCurrentPlayerId(nextPlayer);
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
        onClick={switchPlayer}
        className="w-14 h-14 text-white cursor-pointer"
      />
    </div>
  );
};

export default Controls;
