import CardHeader from './CardHeader'
import Player from './Player'
import Timer from './Timer'

const TableCard = () => {
  return (
    <div className="flex flex-col">
      <CardHeader />
      <div className="flex">
        <Player />
        <Timer />
        <Player />
      </div>
    </div>
  )
}

export default TableCard
