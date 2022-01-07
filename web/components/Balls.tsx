import { RefreshIcon } from '@heroicons/react/outline';

const Balls = () => {
  return (
    <div className="flex justify-between items-center px-8 py-3 my-8 mx-20">
      <button className="w-14 h-14 rounded-full bg-red-800"></button>
      <button className="w-14 h-14 rounded-full bg-yellow-400"></button>
      <button className="w-14 h-14 rounded-full bg-green-600"></button>
      <button className="w-14 h-14 rounded-full bg-amber-900"></button>
      <button className="w-14 h-14 rounded-full bg-blue-600"></button>
      <button className="w-14 h-14 rounded-full bg-pink-300"></button>
      <button className="w-14 h-14 rounded-full bg-black"></button>
      <RefreshIcon className="w-14 h-14 text-white cursor-pointer" />
    </div>
  );
};

export default Balls;
