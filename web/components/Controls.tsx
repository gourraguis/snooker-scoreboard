import { RefreshIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { Balls } from '../utils/balls';
import { currentPlayerIdState, playersState } from '../atoms/userState';

const Controls = () => {
  const [currentPlayerId, setCurrentPlayerId] =
    useRecoilState(currentPlayerIdState);

  const [playerState, setPlayerState] = useRecoilState(playersState);
  const handleScore = (ball: any) => {};

  const handleUser = () => {
    let next;
    if (currentPlayerId === playerState[0].id) next = playerState[1].id;
    else next = playerState[0].id;
    setCurrentPlayerId(next);
    console.log(currentPlayerId);
  };
  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      {Balls.map((ball) => (
        <button
          key={ball.id}
          value={ball.value}
          onClick={() => handleScore(ball)}
          className="w-14 h-14 rounded-full"
          style={{ backgroundColor: ball.color }}
        ></button>
      ))}

      <RefreshIcon
        onClick={handleUser}
        className="w-14 h-14 text-white cursor-pointer"
      />
    </div>
  );
};

export default Controls;
