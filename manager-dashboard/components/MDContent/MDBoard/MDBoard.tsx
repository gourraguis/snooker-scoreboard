import { Card, Row, Col, Divider, Empty } from 'antd'
import { PlusOutlined, HistoryOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { IBoard } from '../../../types/board'
import { MDTimer } from './MDTimer/MDTimer'

import styles from './MDBoard.module.css'
import { emitNewGame } from '../../../services/socket'
import { MDPlayer } from './MDPlayer/MDPlayer'
import { addGameAction, gameForBoardIdSelector, gamesState } from '../../../atoms/games.atom'
import { openNotification } from '../../../services/notification'
import MDModalHistory from './MDModalHistory/MDModalHistory'

interface MDBoardProps {
  board: IBoard
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board }) => {
  const game = useRecoilValue(gameForBoardIdSelector(board.id))
  const setGames = useSetRecoilState(gamesState)
  const addGame = addGameAction(setGames)
  const [isModalVisible, setIsModalVisible] = useState(false)

  console.log(game)

  const handleNewGame = () => {
    emitNewGame(board.id, (newGame) => {
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
    setIsModalVisible(true)
    console.log(`show history on board: ${board.name}`)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Card
      title={board.name}
      extra={<MDTimer startedAt={game?.startedAt} />}
      actions={[
        <PlusOutlined onClick={handleNewGame} key="initGame" />,
        <HistoryOutlined onClick={handleHistory} key="history" />,
      ]}
      className={styles.card}
    >
      {!game ? (
        <Empty description="Il n'y as pas de parti sur cette table, veuillez lancer une nouvelle." />
      ) : (
        <Row>
          <Col span={11} className={styles.column}>
            <MDPlayer player={game.players[0]} />
          </Col>

          <Col span={2}>
            <Divider type="vertical" className={styles.divider} />
          </Col>

          <Col span={11} className={styles.column}>
            <MDPlayer player={game.players[1]} />
          </Col>
        </Row>
      )}
      <MDModalHistory
        visible={isModalVisible}
        onCancel={handleCancel}
        name={board.name}
        history={game?.history?.slice(0, -1)}
      />
    </Card>
  )
}
