import { Typography } from 'antd'
import moment from 'moment'
import { FunctionComponent, useState } from 'react'
import { useInterval } from 'usehooks-ts'

const { Text } = Typography

interface MDTimerProps {
  startedAt?: Date
}

export const MDTimer: FunctionComponent<MDTimerProps> = ({ startedAt }) => {
  const [timerText, setTimerText] = useState('00:00')

  useInterval(() => {
    if (startedAt) {
      setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'))
    }
  }, 1000)

  return <div>{startedAt ? <Text type="secondary">{timerText}</Text> : <Text type="secondary">00:00</Text>}</div>
}
