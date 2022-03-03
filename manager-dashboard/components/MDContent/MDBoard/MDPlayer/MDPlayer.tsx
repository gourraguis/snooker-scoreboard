import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { IPlayer } from '../../../../types/player'

import styles from './MDPlayer.module.css'
import { gameForBoardIdSelector } from '../../../../atoms/games.atom'
import { emitUpdatePlayerName } from '../../../../services/socket'
import { IInitBoard } from '../../../../types/initBoard'

const { Paragraph } = Typography

interface MDPlayerProps {
  player: IPlayer
  boardId: string
}

export const MDPlayer: FunctionComponent<MDPlayerProps> = ({ player, boardId }) => {
  const [name, setName] = useState(player.name)
  const game = useRecoilValue(gameForBoardIdSelector(boardId))

  const handleUpdateName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let newBoard: IInitBoard
    if (player.name !== game?.players[0].name) {
      newBoard = {
        boardId,
        firstPlayer: game?.players[0].name,
        secondPlayer: name,
      }
    } else {
      newBoard = {
        boardId,
        firstPlayer: name,
        secondPlayer: game?.players[1].name,
      }
    }
    emitUpdatePlayerName(newBoard)
  }
  return (
    <Space direction="vertical">
      <form onSubmit={handleUpdateName}>
        <input
          className={styles.name}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </form>
      <UserOutlined className={styles[`icon${player.turn}`]} />
      <Paragraph keyboard className={styles.score}>
        {player.score}
      </Paragraph>
    </Space>
  )
}
