import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IPlayer } from '../../../../types/player'

import styles from './MDPlayer.module.css'
import { gameForBoardIdSelector, gamesState } from '../../../../atoms/games.atom'
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
  const [games, setGames] = useRecoilState(gamesState)

  useEffect(() => {
    setName(player.name)
  }, [player])

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
    if (game) {
      const players = [
        {
          name: newBoard.firstPlayer!,
          turn: game.players[0].turn,
          score: game.players[0].score,
        },
        {
          name: newBoard.secondPlayer!,
          turn: game.players[1].turn,
          score: game.players[1].score,
        },
      ]
      const newGame = {
        id: game.id,
        boardId: game.boardId,
        players,
        startedAt: game.startedAt,
        finishedAt: game.finishedAt,
        history: game.history,
      }
      setGames(() => [...games.filter(({ id }) => id !== newGame.id), newGame])
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
