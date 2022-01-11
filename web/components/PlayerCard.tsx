import { UserIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import { currentPlayerIdState, playersState } from '../atoms/userState';
import classNames from 'classnames';
import { useEffect } from 'react';

const PlayerCard = ({ id }: any) => {
  const currentPlayerId = useRecoilValue(currentPlayerIdState);
  const user = useRecoilValue(playersState);
  useEffect(() => {
    console.log('currentPlayerId', currentPlayerId);
    console.log('id', id);
  }, [currentPlayerId]);
  return (
    <div
      className={classNames(
        'flex flex-col justify-center items-center border-[1px] border-primary-w bg-primary-b rounded-lg py-1 my-8 divide-y divide-primary-w',
        id === currentPlayerId &&
          'divide-green-600 border-green-600 shadow-md shadow-green-600',
      )}
    >
      <div className="w-full flex justify-center items-center">
        <UserIcon className={`w-20 h-20 my-2 ${user[id].color}`} />
      </div>
      <div className="hidden text-blue-800"></div>
      <div className="hidden text-red-800"></div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">
          {user[id].score}
        </h1>
      </div>
    </div>
  );
};

export default PlayerCard;
