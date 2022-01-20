import { useRecoilValue } from 'recoil'
import { boardsState } from '../atoms/boardState'
import { emitNewGame } from '../services/socket'
import CardHeader from './CardHeader'
import Player from './Player'
import Timer from './Timer'

const TableCard = () => {
  const boards = useRecoilValue(boardsState)

  return (
    <div className="flex flex-col justify-center  -center w-full mx-5 space-y-8">
      {boards.map((board) => (
        <div key={board.name} className="flex flex-col mx-10 w-full rounded-lg border-2 border-primary-w bg-primary-b">
          <CardHeader onNewGame={() => emitNewGame(board.id)} tableName={board.name} />
          <div className="grid grid-cols-3 border-t-2 border-primary-w">
            <Player color={board.players[0].color} playerName={board.players[0].name} points={board.playersPoints[0]} />
            <Timer startedAt={board.startedAt} />
            <Player color={board.players[1].color} playerName={board.players[1].name} points={board.playersPoints[1]} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TableCard
