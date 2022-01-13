import { UserIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import { playingHistoryWithoutCurrentTurnSelector } from '../atoms/historyState';
import Ball from './Ball';

const History = () => {
  const playingHistoryWithoutCurrentTurn = useRecoilValue(
    playingHistoryWithoutCurrentTurnSelector,
  );

  const historyLength = playingHistoryWithoutCurrentTurn.length;
  const shownHistory = playingHistoryWithoutCurrentTurn.slice(
    historyLength > 4 ? historyLength - 5 : 0,
    historyLength,
  );

  return (
    <div
      className="mr-10 flex flex-col items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg py-3 my-8 h-[28rem]"
    >
      <div className="w-full border-primary-w border-b-2 pb-2">
        <h1 className="text-primary-w font-semibold text-3xl text-center">
          Historique
        </h1>
      </div>
      <div className="w-full ml-12 mt-8 overflow-y-auto">
        {shownHistory.map((item, index) => (
          <div
            key={index}
            className="w-full flex justify-start items-center space-x-8 mb-6"
          >
            <UserIcon
              className={`w-8 h-8 ${
                item.value === 0 ? 'text-red-800' : 'text-blue-800'
              } `}
            />
            <div>
              <h3 className="text-primary-w">
                Marque {item.scoredBalls.reduce((a, b) => a + b, 0)} points
              </h3>
              <div className="flex justify-start items-center space-x-1">
                {item.scoredBalls.map((ball, index) => (
                  <Ball key={index} value={ball} size="sm" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
