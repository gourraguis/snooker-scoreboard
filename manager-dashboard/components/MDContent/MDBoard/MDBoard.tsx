import { Card, Row, Col, Divider, Empty, Menu, Dropdown } from 'antd'
import { PlusOutlined, HistoryOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { IBoard } from '../../../types/board'
import { MDTimer } from './MDTimer/MDTimer'

import styles from './MDBoard.module.css'
import { emitNewGame, stopTimer } from '../../../services/socket'
import { MDPlayer } from './MDPlayer/MDPlayer'
import { addGameAction, gameForBoardIdSelector, gamesState, timerState } from '../../../atoms/games.atom'
import { openNotification } from '../../../services/notification'
import MDModalHistory from './MDModalHistory/MDModalHistory'
import MDModalNewGame from './MDModalNewGame/MDModalNewGame'
import { IInitBoard } from '../../../types/initBoard'
import { saveGame } from '../../../services/api'

interface MDBoardProps {
  board: IBoard
  dailyGames: number
  weeklyGames: number
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board, dailyGames, weeklyGames }) => {
  const game = useRecoilValue(gameForBoardIdSelector(board.id))
  const setGames = useSetRecoilState(gamesState)
  const oldGame = useRecoilValue(gamesState)
  const stoppedTimer = useSetRecoilState(timerState)
  const [historyModal, setHistoryModal] = useState(false)
  const [newGameModal, setNewGameModal] = useState(false)

  const addGame = addGameAction(setGames)

  const startNewGame = () => {
    stoppedTimer(false)
    const initBoard: IInitBoard = {
      boardId: board.id,
      firstPlayer: game?.players[0].name,
      secondPlayer: game?.players[1].name,
    }
    if (oldGame.length > 0) saveGame(oldGame[oldGame.length - 1])

    emitNewGame(initBoard, (newGame) => {
      if (!newGame) {
        openNotification({
          title: 'Erreur, on a pas pu lancer une nouvelle partie..',
          type: 'error',
        })
      }
      addGame(newGame)
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

  const handleEndGame = () => {
    stoppedTimer(true)
    const initBoard: IInitBoard = {
      boardId: board.id,
      firstPlayer: game?.players[0].name,
      secondPlayer: game?.players[1].name,
    }
    if (oldGame.length > 0) saveGame(oldGame[oldGame.length - 1])
    stopTimer(initBoard)
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={startNewGame} key="initSameGame">
        3awed match (meme joueurs)
      </Menu.Item>

      <Menu.Item onClick={() => setNewGameModal(true)} key="initDifferentGame">
        bda match jdid (joueurs différents)
      </Menu.Item>
    </Menu>
  )
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
        <Dropdown overlay={menu} trigger={['click']}>
          <PlusOutlined />
        </Dropdown>,
        <HistoryOutlined onClick={handleHistory} key="history" />,
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
      <MDModalNewGame visible={newGameModal} onCancel={() => setNewGameModal(false)} boardId={board.id} />
    </Card>
  )
}
