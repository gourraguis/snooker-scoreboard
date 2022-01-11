import { UserIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { playingHistoryState } from '../atoms/historyState';

const History = () => {
  const history = useRecoilValue(playingHistoryState);
  return (
    <div
      className="mr-10 flex flex-col items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg py-3 my-8 h-96"
    >
      <div className="w-full border-primary-w border-b-2 pb-2">
        <h1 className="text-primary-w font-semibold text-3xl text-center">
          Historique
        </h1>
      </div>
      <div className="w-full ml-8 mt-4 overflow-y-auto">
        {history.map((item) => (
          <div className="w-full flex justify-start items-center space-x-8 mb-6">
            <UserIcon
              className={`w-8 h-8 ${
                item.value === 0 ? 'text-red-800' : 'text-blue-800'
              } `}
            />
            <h3 className="text-primary-w">
              Marque {item.scoredBalls.reduce((a, b) => a + b, 0)} points
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
