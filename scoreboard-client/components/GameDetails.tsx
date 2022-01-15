import { useRecoilValue } from 'recoil';
import { currentScoreSelector, lastBallSelector } from '../atoms/historyState';
import Ball from './Ball';
import Timer from './Timer';

const GameDetails = () => {
  const lastBall = useRecoilValue(lastBallSelector);
  const currentScore = useRecoilValue(currentScoreSelector);

  return (
    <div
      className="grid grid-row-3 border-[1px] 
        border-primary-w bg-primary-b rounded-lg
        my-8 divide-y divide-primary-w
        "
    >
      <Timer />
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">LAST</h1>
        {lastBall ? (
          <Ball value={lastBall.value} showValue />
        ) : (
          <Ball value={0} />
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">
          SCORE {currentScore}
        </h1>
      </div>
    </div>
  );
};

export default GameDetails;
