import { Typography } from 'antd'
import moment from 'moment'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useInterval } from 'usehooks-ts'
import { timerState } from '../../../../atoms/games.atom'

const { Text } = Typography

interface MDTimerProps {
  startedAt?: Date
}

export const MDTimer: FunctionComponent<MDTimerProps> = ({ startedAt }) => {
  const [timerText, setTimerText] = useState('00:00')
  const stopedTimer = useRecoilValue(timerState)

  useInterval(() => {
    if (startedAt) {
      setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'))
    }
  }, 1000)

  return (
    <div>
      {stopedTimer && <Text type="secondary">00:00</Text>}
      {!stopedTimer && <Text type="secondary">{timerText}</Text>}
    </div>
  )
}
