import { UserIcon } from '@heroicons/react/solid';
import { useRecoilValue } from 'recoil';
import { currentPlayerIdState, playersState } from '../atoms/userState';

const PlayerCard = ({ id }: any) => {
  const currentPlayerId = useRecoilValue(currentPlayerIdState);
  const user = useRecoilValue(playersState);
  return (
    <div
      className={`flex flex-col justify-center items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg py-1
        my-8 divide-y divide-primary-w ${
          id == currentPlayerId &&
          'divide-green-600 border-green-600 shadow-md shadow-green-600 '
        }"`}
    >
      <div className="w-full flex justify-center items-center">
        <UserIcon className={`w-20 h-20 my-2`} />
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">
          {user[id].score}
        </h1>
      </div>
    </div>
  );
};

export default PlayerCard;
