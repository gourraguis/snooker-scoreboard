import { FunctionComponent } from 'react';
import classNames from 'classnames';

interface HeadingProps {
  color: string | undefined;
  size?: number;
  onClick?: any;
  value?: number;
}

const Ball: FunctionComponent<HeadingProps> = ({
  size,
  color,
  onClick,
  value,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={classNames(
        'mt-1 rounded-full text-primary-w font-semibold text-4xl text-center',
        !value && `w-1 h-1 px-${size} py-${size}`,
        value && 'py-3 px-6',
      )}
    >
      {value}
    </div>
  );
};

export default Ball;
