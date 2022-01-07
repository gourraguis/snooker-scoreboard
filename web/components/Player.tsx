import { UserIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { selectedUserState } from '../atoms/selectedUserState';

const Player = ({ id, color, score }: any) => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const handleUser = () => {
    setSelectedUser({
      selectedUser: id,
    });
  };
  return (
    <div
      onClick={handleUser}
      className={`flex flex-col justify-center items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg py-1
        my-8 divide-y divide-primary-w cursor-pointer ${
          selectedUser.selectedUser === id &&
          'divide-green-600 border-green-600 shadow-md shadow-green-600 '
        }"`}
    >
      <div className="w-full flex justify-center items-center">
        <UserIcon className={`w-20 h-20 my-2 ${color}`} />
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">{score}</h1>
      </div>
    </div>
  );
};

export default Player;
