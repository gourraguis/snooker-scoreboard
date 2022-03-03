import { Card, Row, Col, Divider, Empty, Menu, Dropdown } from 'antd'
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
import MDModalNewGame from './MDModalNewGame/MDModalNewGame'
import { IInitBoard } from '../../../types/initBoard'
import { saveGame } from '../../../services/manager'

interface MDBoardProps {
  board: IBoard
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board }) => {
  const game = useRecoilValue(gameForBoardIdSelector(board.id))
  const setGames = useSetRecoilState(gamesState)
  const addGame = addGameAction(setGames)
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false)
  const [isNewGameModalVisible, setIsNewGameModalVisible] = useState(false)
  const oldGame = useRecoilValue(gamesState)

  const handleNewGame = () => {
    const initBoard: IInitBoard = {
      boardId: board.id,
      firstPlayer: '',
      secondPlayer: '',
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
    setIsHistoryModalVisible(true)
    console.log(`show history on board: ${board.name}`)
  }
  const handleCancelHistoryModal = () => {
    setIsHistoryModalVisible(false)
  }
  const handleCancelNewGameModal = () => {
    setIsNewGameModalVisible(false)
  }
  const handleNewDiffGame = () => {
    setIsNewGameModalVisible(true)
  }
  const menu = (
    <Menu>
      <Menu.Item onClick={handleNewGame} key="initSameGame">
        Restart game with same players
      </Menu.Item>

      <Menu.Item onClick={handleNewDiffGame} key="initDifferentGame">
        Restart game with different players
      </Menu.Item>
    </Menu>
  )
  return (
    <Card
      title={board.name}
      extra={<MDTimer startedAt={game?.startedAt} />}
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
            visible={isHistoryModalVisible}
            onCancel={handleCancelHistoryModal}
            name={board.name}
            history={game!.history!}
          />
        </Row>
      )}
      <MDModalNewGame visible={isNewGameModalVisible} onCancel={handleCancelNewGameModal} boardId={board.id} />
    </Card>
  )
}
