import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { balls } from '../utils/balls';
import { IBall } from '../types/Ball';
import {
  currentTurnSelector,
  playingHistoryState,
} from '../atoms/historyState';

const Controls = () => {
  const [playingHistory, setPlayingHistory] =
    useRecoilState(playingHistoryState);
  const currentTurn = useRecoilValue(currentTurnSelector);

  const scoreBall = (ball: IBall) => {
    setPlayingHistory([
      ...playingHistory.slice(0, playingHistory.length - 1),
      {
        value: currentTurn.value,
        scoredBalls: [...currentTurn.scoredBalls, ball.value],
      },
    ]);
  };

  const switchPlayer = () => {
    const nextTurn = ((currentTurn.value + 1) % 2) as 0 | 1;
    setPlayingHistory([
      ...playingHistory,
      {
        value: nextTurn,
        scoredBalls: [],
      },
    ]);
  };

  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      {balls.map((ball) => (
        <button
          key={ball.value}
          value={ball.value}
          onClick={() => scoreBall(ball)}
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
