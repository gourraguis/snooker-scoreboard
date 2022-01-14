import { useRecoilValue } from 'recoil'
import { boardState } from '../atoms/boardState'
import CardHeader from './CardHeader'
import Player from './Player'
import Timer from './Timer'

const TableCard = () => {
  const boards = useRecoilValue(boardState)

  return (
    <div className="flex flex-col justify-center items-center w-full mx-5 space-y-8">
      {boards.map((item) => (
        <div key={item.tableName} className="flex flex-col mx-10 w-full rounded-lg border-2 border-primary-w">
          <CardHeader tableName={item.tableName} />
          <div className="grid grid-cols-3 border-t-2 border-primary-w">
            <Player
              color={item.players[0].color}
              playerName={item.players[0].name}
              isCurrent={item.players[0].turn}
              points={item.players[0].points}
            />
            <Timer startedAt={item.startedAt} />
            <Player
              color={item.players[1].color}
              playerName={item.players[1].name}
              isCurrent={item.players[1].turn}
              points={item.players[1].points}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TableCard
