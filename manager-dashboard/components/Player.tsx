import { UserIcon } from '@heroicons/react/solid'
import { FunctionComponent } from 'react'

interface PlayerCardProps {
  isCurrent?: number
  color: string
  points: number
  playerName: string
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({ isCurrent, color, points, playerName }) => {
  return (
    <div className="flex flex-col justify-center items-center py-1 my-8">
      <div className="w-full flex flex-col justify-center items-center">
        <UserIcon className={`w-16 h-16 my-2 ${color}`} />
        <h3 className="text-primary-w font-semibold text-2xl mb-4">{playerName}</h3>
      </div>
      <div className="hidden text-blue-800"></div>
      <div className="hidden text-red-800"></div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-primary-w font-semibold text-4xl py-4">{points}</h1>
      </div>
    </div>
  )
}

export default PlayerCard
