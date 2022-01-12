import { FunctionComponent } from 'react';

interface HeadingProps {
  size: number;
  color: string | undefined;
  onClick?: any;
}

const Ball: FunctionComponent<HeadingProps> = ({ size, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`px-${size} py-${size} w-1 h-1 mt-1 rounded-full `}
    ></div>
  );
};

export default Ball;
