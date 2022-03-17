import { useState } from 'react'
import moment from 'moment'
import { useRecoilValue } from 'recoil'
import { useInterval } from 'usehooks-ts'
import { startedAtSelector, timerState } from '../../../../atoms/game.atom'

import styles from './SCTimer.module.css'

const SCTimer = () => {
  const startedAt = useRecoilValue(startedAtSelector)
  const [timerText, setTimerText] = useState('00:00')
  const stopedTimer = useRecoilValue(timerState)

  useInterval(() => {
    setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'))
  }, 1000)

  return (
    <div className={styles.center}>
      {stopedTimer && <p className={styles.timer}>00:00</p>}
      {!stopedTimer && <p className={styles.timer}>{timerText}</p>}
    </div>
  )
}

export default SCTimer
