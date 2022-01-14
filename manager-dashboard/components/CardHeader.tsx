import { startGame } from '../services/socket'
import { FunctionComponent } from 'react'

interface HeadingProps {
  tableName: string
}

const CardHeader: FunctionComponent<HeadingProps> = ({ tableName }) => {
  const handleStart = () => {
    startGame()
  }
  return (
    <div className="flex justify-between items-center mx-5 py-4">
      <h3 className="text-3xl font-semibold text-primary-w">{tableName}</h3>
      <button
        onClick={handleStart}
        className="text-primary-w text-xl rounded-lg px-4 py-1 border-primary-w border-[1px] hover:bg-black"
      >
        Restart
      </button>
    </div>
  )
}

export default CardHeader
