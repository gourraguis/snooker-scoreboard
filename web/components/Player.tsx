const Player = ({ player }: any) => {
  return (
    <div
      className="flex justify-center items-center border-[1px] 
        border-primary-w bg-primary-b rounded-lg px-8 py-3 my-8"
    >
      <h1 className="text-primary-w font-semibold text-xl">{`Player ${player}`}</h1>
    </div>
  );
};

export default Player;
