import { useRecoilValue } from 'recoil';
import { ballsState } from '../atoms/ballState';
import Timer from './Timer';

const Feed = () => {
  const ball = useRecoilValue(ballsState);
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
        <div
          className={`text-primary-w font-semibold text-4xl py-3 px-6 rounded-full ${ball.color}`}
        >
          {ball.value}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">
          SCORE {ball.score}
        </h1>
      </div>
    </div>
  );
};

export default Feed;
