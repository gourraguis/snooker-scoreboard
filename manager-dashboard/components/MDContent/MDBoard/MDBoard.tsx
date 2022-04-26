import { Card, Row, Col, Divider, Empty } from 'antd'
import { PlusOutlined, HistoryOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { IBoard } from '../../../types/board'
import { MDTimer } from './MDTimer/MDTimer'

import styles from './MDBoard.module.css'
import { MDPlayer } from './MDPlayer/MDPlayer'
import { gameStateFamily } from '../../../atoms/games.atom'
import { openNotification } from '../../../services/notification'
import MDModalHistory from './MDModalHistory/MDModalHistory'
import MDModalNewGame from './MDModalNewGame/MDModalNewGame'
import { saveGame, startGame } from '../../../services/manager-api'
import { incrementGamesSelector } from '../../../atoms/boards.atom'
import { pauseUpdatesState } from '../../../atoms/pauseUpdates.atom'
import { playersNamesState } from '../../../atoms/playersNames.atom'

interface MDBoardProps {
  board: IBoard
  dailyGames: number
  weeklyGames: number
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board, dailyGames, weeklyGames }) => {
  const [game, setGame] = useRecoilState(gameStateFamily(board.id))
  const [historyModal, setHistoryModal] = useState(false)
  const [newGameModal, setNewGameModal] = useState(false)
  const incrementGames = useSetRecoilState(incrementGamesSelector)
  const setPauseUpdates = useSetRecoilState(pauseUpdatesState)
  const setPlayersNamesState = useSetRecoilState(playersNamesState)

  const handleHistory = () => {
    if (!game) {
      console.error(`trying to show history for a game that hasn't started`)
      return
    }
    setHistoryModal(true)
  }

  const handleEndGame = async () => {
    if (!game) {
      openNotification({
        title: "Aucun match n'est actif sur ce tableau",
        type: 'warning',
      })
      return
    }

    const { players: p } = game
    if (p[0].score === 0 && p[1].score === 0) {
      openNotification({
        title: 'Score 0-0, le match ne sera pas enregistré',
        type: 'warning',
      })
      return
    }

    setPauseUpdates(true)
    setTimeout(() => {
      setPauseUpdates(false)
    }, 10000)
    setGame(null)
    incrementGames(game.boardId)
    await saveGame(game)
  }

  const handleStartGame = async (firstPlayer: string, secondPlayer: string) => {
    if (game) {
      await handleEndGame()
    }

    const newGame = await startGame({
      boardId: board.id,
      firstPlayer,
      secondPlayer,
    })

    if (!newGame) {
      return
    }

    setGame(newGame)
    setPlayersNamesState([newGame.players[0].name, newGame.players[1].name])
    setNewGameModal(false)
  }

  return (
    <Card
      title={board.name}
      cover={
        <div className={styles.cover}>
          <p className={styles.text}>
            <span className={styles.day}>{dailyGames}</span>
            Jour
          </p>
          <p className={styles.text}>
            <span className={styles.week}>{weeklyGames}</span>
            Semaine
          </p>
        </div>
      }
      extra={
        <div className={styles.endSection}>
          <MDTimer startedAt={game?.startedAt} />
          <CloseCircleOutlined className={styles.endButton} onClick={handleEndGame} />
        </div>
      }
      actions={[
        <PlusOutlined onClick={() => setNewGameModal(true)} key="newGame" />,
        <HistoryOutlined onClick={handleHistory} key="viewHistory" />,
      ]}
      className={styles.card}
    >
      {!game ? (
        <Empty description="Il n'y as pas de parti sur cette table, veuillez lancer une nouvelle." />
      ) : (
        <Row>
          <Col span={11} className={styles.column}>
            <MDPlayer player={game.players[0]} boardId={board.id} />
          </Col>

          <Col span={2}>
            <Divider type="vertical" className={styles.divider} />
          </Col>

          <Col span={11} className={styles.column}>
            <MDPlayer player={game.players[1]} boardId={board.id} />
          </Col>
          <MDModalHistory
            visible={historyModal}
            onCancel={() => setHistoryModal(false)}
            name={board.name}
            history={game!.history!}
          />
        </Row>
      )}
      {newGameModal && (
        <MDModalNewGame
          previousPlayers={game?.players.map(({ name }) => name)}
          onSubmit={handleStartGame}
          onCancel={() => setNewGameModal(false)}
        />
      )}
    </Card>
  )
}
