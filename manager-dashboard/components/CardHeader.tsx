import { startGame } from '../services/socket'

const CardHeader = () => {
  const handleStart = () => {
    startGame()
  }
  return (
    <div className="flex">
      <h3>Table 1</h3>
      <button onClick={handleStart}>Restart</button>
    </div>
  )
}

export default CardHeader
