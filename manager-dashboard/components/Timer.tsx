import { useState, useEffect } from 'react'
import moment from 'moment'
import { FunctionComponent } from 'react'

interface TimerProps {
  startedAt: string
}

const Timer: FunctionComponent<TimerProps> = ({ startedAt }) => {
  const [timerText, setTimerText] = useState('00:00')

  useEffect(() => {
    if (startedAt) {
      setInterval(() => {
        setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'))
      }, 1000)
    }
  }, [startedAt])

  return (
    <div className="w-full flex justify-center items-center border-r-[1px] border-l-[1px] border-primary-w">
      <h1 className="text-primary-w font-semibold text-2xl py-4">{timerText}</h1>
    </div>
  )
}

export default Timer
