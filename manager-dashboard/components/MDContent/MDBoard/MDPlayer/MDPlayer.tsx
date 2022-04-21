import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { IPlayer } from '../../../../types/player'

import styles from './MDPlayer.module.css'
import { gameStateFamily } from '../../../../atoms/games.atom'
import { emitUpdatePlayerName } from '../../../../services/socket'

const { Paragraph } = Typography

interface MDPlayerProps {
  player: IPlayer
  boardId: string
}

export const MDPlayer: FunctionComponent<MDPlayerProps> = ({ player, boardId }) => {
  const setGame = useSetRecoilState(gameStateFamily(boardId))
  const [name, setName] = useState(player.name)

  useEffect(() => {
    setName(player.name)
  }, [player])

  const updateName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = player.turn === 0 ? 'firstPlayer' : 'secondPlayer'

    setGame((prevGame) => {
      if (!prevGame) {
        return null
      }
      return {
        ...prevGame,
        players: [
          {
            ...prevGame.players[0],
            name: player.turn === 0 ? name : prevGame.players[0].name,
          },
          {
            ...prevGame.players[1],
            name: player.turn === 1 ? name : prevGame.players[1].name,
          },
        ],
      }
    })

    emitUpdatePlayerName({
      boardId,
      [field]: name,
    })
  }

  return (
    <Space direction="vertical">
      <form onSubmit={updateName}>
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
