import { FunctionComponent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { getBallColor } from '../../../../utils/balls'

import styles from './SCBall.module.css'
import { EBall } from '../../../../types/ball'

interface SCBallProps {
  value: EBall
  size?: 'sm' | 'md'
  onClick?: () => void
}

const sizes = {
  sm: 16,
  md: 50,
}

const SCBall: FunctionComponent<SCBallProps> = ({ size = 'md', onClick, value }) => (
  <AnimatePresence exitBeforeEnter>
    <motion.div
      key={value}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15 }}
    >
      <div
        onClick={onClick}
        style={{
          backgroundColor: getBallColor(value),
          width: `${sizes[size]}px`,
          height: `${sizes[size]}px`,
        }}
        className={classNames(styles.ball, { [styles.ballPlaceholder]: !value })}
      />
    </motion.div>
  </AnimatePresence>
)

export default SCBall
