import { UserIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

interface PlayerCardProps {
  isCurrent: boolean;
  color: string;
  points: number;
  name: string;
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({
  isCurrent,
  color,
  points,
  name,
}) => {
  return (
    <div
      className={classNames(
        'flex flex-col justify-center items-center border-[1px] border-primary-w bg-primary-b rounded-lg py-1 my-8 divide-y divide-primary-w',
        {
          'divide-green-600 border-green-600 shadow-md shadow-green-600':
            isCurrent,
        },
      )}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <UserIcon className={`w-16 h-16 my-2 ${color}`} />
        <h3 className="text-primary-w font-semibold text-2xl mb-4">{name}</h3>
      </div>
      <div className="hidden text-blue-800"></div>
      <div className="hidden text-red-800"></div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">{points}</h1>
      </div>
    </div>
  );
};

export default PlayerCard;
