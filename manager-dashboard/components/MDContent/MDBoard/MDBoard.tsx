import { Card, Row, Col, Divider, Empty, Menu, Dropdown } from 'antd'
import { PlusOutlined, HistoryOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IBoard } from '../../../types/board'
import { MDTimer } from './MDTimer/MDTimer'

import styles from './MDBoard.module.css'
import { emitNewGame, stopTimer } from '../../../services/socket'
import { MDPlayer } from './MDPlayer/MDPlayer'
import { gameStateFamily, timerState } from '../../../atoms/games.atom'
import { openNotification } from '../../../services/notification'
import MDModalHistory from './MDModalHistory/MDModalHistory'
import MDModalNewGame from './MDModalNewGame/MDModalNewGame'
import { IInitBoard } from '../../../types/initBoard'
import { saveGame } from '../../../services/api'
import { incrementGamesSelector } from '../../../atoms/boards.atom'

interface MDBoardProps {
  board: IBoard
  dailyGames: number
  weeklyGames: number
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board, dailyGames, weeklyGames }) => {
  const [game, setGame] = useRecoilState(gameStateFamily(board.id))
  const incrementGames = useSetRecoilState(incrementGamesSelector)
  const stoppedTimer = useSetRecoilState(timerState)
  const [historyModal, setHistoryModal] = useState(false)
  const [newGameModal, setNewGameModal] = useState(false)

  const startNewGame = async (firstPlayer: string, secondPlayer: string) => {
    stoppedTimer(false)
    const initBoard: IInitBoard = {
      boardId: board.id,
      firstPlayer,
      secondPlayer,
    }
    if (game) {
      const { players: p } = game
      if (p[0].score !== 0 || p[1].score !== 0) {
        incrementGames(game.boardId)
        await saveGame(game)
      }
    }

    emitNewGame(initBoard, (newGame) => {
      if (!newGame) {
        openNotification({
          title: 'Erreur, on a pas pu lancer une nouvelle partie..',
          type: 'error',
        })
      }
      setGame(newGame)
      setNewGameModal(false)
      openNotification({
        title: 'Une nouvelle partie a été lancé',
      })
    })
  }

  const handleHistory = () => {
    if (!game) {
      console.error(`trying to show history for a game that hasn't started`)
      return
    }
    setHistoryModal(true)
  }

  const handleEndGame = async () => {
    stoppedTimer(true)
    const initBoard: IInitBoard = {
      boardId: board.id,
      firstPlayer: game?.players[0].name,
      secondPlayer: game?.players[1].name,
    }
    if (game) {
      incrementGames(game.boardId)
      await saveGame(game)
    }
    stopTimer(initBoard)
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
          onSubmit={startNewGame}
          onCancel={() => setNewGameModal(false)}
        />
      )}
    </Card>
  )
}
