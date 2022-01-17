import { UserIcon } from '@heroicons/react/solid'
import { FunctionComponent } from 'react'

interface PlayerCardProps {
  color: string
  points: number
  playerName: string
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({ color, points, playerName }) => (
  <div className="flex flex-col justify-center items-center py-1">
    <div className="w-full flex flex-col justify-center items-center">
      <UserIcon className={`w-24 h-24 my-2 ${color}`} />
      <h3 className="text-primary-w font-semibold text-lg mb-4 text-center">{playerName}</h3>
    </div>
    <div className="hidden text-blue-800" />
    <div className="hidden text-red-800" />
    <div className="w-full flex justify-center items-center">
      <h1 className="text-primary-w font-semibold text-4xl py-2">{points}</h1>
    </div>
  </div>
)

export default PlayerCard
