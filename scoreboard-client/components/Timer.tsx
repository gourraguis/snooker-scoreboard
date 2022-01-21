import { useState } from 'react'
import moment from 'moment'
import { useRecoilValue } from 'recoil'
import { useInterval } from 'usehooks-ts'
import { startedAtState } from '../atoms/history'

const Timer = () => {
  const startedAt = useRecoilValue(startedAtState)
  const [timerText, setTimerText] = useState('00:00')

  useInterval(() => {
    setTimerText(moment(moment().diff(moment(startedAt))).format('mm:ss'))
  }, 1000)

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-5xl py-4">{timerText}</h1>
    </div>
  )
}

export default Timer
