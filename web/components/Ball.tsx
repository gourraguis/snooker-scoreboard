import { FunctionComponent } from 'react';
import classNames from 'classnames';
import { balls } from '../utils/balls';

interface HeadingProps {
  value: number;
  showValue?: boolean;
  size?: 'sm' | 'md';
  onClick?: any;
}

const sizes = {
  sm: 2,
  md: 8,
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
        !showValue && `w-1 h-1 px-${sizes[size]} py-${sizes[size]}`,
        showValue && 'py-3 px-6',
      )}
    >
      {showValue && value}
    </div>
  );
};

export default Ball;
