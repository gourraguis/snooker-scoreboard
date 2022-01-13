import board from '../services/socket/board'

const CardHeader = () => {
  const handleStart = () => {
    board.startGame()
  }
  return (
    <div className="flex">
      <h3>Table 1</h3>
      <button onClick={handleStart}>Restart</button>
    </div>
  )
}

export default CardHeader
