import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { balls } from '../utils/balls';

interface HeadingProps {
  value: number;
  showValue?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

const sizes = {
  sm: 4,
  md: 16,
};

const Ball: FunctionComponent<HeadingProps> = ({
  size = 'md',
  onClick,
  value,
  showValue = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: balls.find((b) => b.value === value)?.color || 'white',
      }}
      className={classNames(
        'mt-1 rounded-full text-primary-w font-semibold text-4xl text-center',
        {
          [`w-${sizes[size]} h-${sizes[size]} px-2 py-2`]: !showValue,
        },
        { ['py-3 px-6']: showValue },
      )}
    >
      {showValue && value}
    </div>
  );
};

export default Ball;
