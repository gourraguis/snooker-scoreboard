import { UserIcon } from '@heroicons/react/solid';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scoreState } from '../atoms/ballState';
import {
  selectedUserState,
  user1PointState,
  user2PointState,
} from '../atoms/selectedUserState';

const PlayerCard = ({ id, color, score }: any) => {
  const [selectedUser, setSelectedUser] = useRecoilState(selectedUserState);
  const [user1Point, setUser1Point] = useRecoilState(user1PointState);
  const [user2Point, setUser2Point] = useRecoilState(user2PointState);
  const [lastScore, setLastScore] = useRecoilState(scoreState);

  const handleUser = () => {
    if (selectedUser.selectedUser == 1) {
      let newScore = user1Point.score + lastScore.val;
      setUser1Point({
        score: newScore,
      });
      setLastScore({
        val: 0,
      });
    } else if (selectedUser.selectedUser == 2) {
      let newScore = user2Point.score + lastScore.val;
      setUser2Point({
        score: newScore,
      });
      setLastScore({
        val: 0,
      });
    }
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
        {id == 1 && (
          <h1 className="text-primary-w font-semibold text-4xl py-4">
            {user1Point.score}
          </h1>
        )}
        {id == 2 && (
          <h1 className="text-primary-w font-semibold text-4xl py-4">
            {user2Point.score}
          </h1>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
