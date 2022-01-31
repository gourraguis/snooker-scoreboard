import { FunctionComponent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
        className={styles.ball}
      >
        {showValue && value}
      </div>
    </motion.div>
  </AnimatePresence>
)

export default SCBall
