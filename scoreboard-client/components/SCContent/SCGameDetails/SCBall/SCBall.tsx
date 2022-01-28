import { FunctionComponent } from 'react'
import { getBallColor } from '../../../../utils/balls'
import { EBall } from '../../../../types/ball'

import styles from './SCBall.module.css'

interface SCBallProps {
  value: EBall
  showValue?: boolean
  size?: 'sm' | 'md'
  onClick?: () => void
}

const sizes = {
  sm: 16,
  md: 50,
}

const SCBall: FunctionComponent<SCBallProps> = ({ size = 'md', onClick, value, showValue = false }) => (
  <div
    onClick={onClick}
    style={{
      backgroundColor: getBallColor(value),
      width: `${sizes[size]}px`,
      height: `${sizes[size]}px`,
    }}
    className={styles.ball}
  >
    {showValue && value}
  </div>
)

export default SCBall
