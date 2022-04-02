import React, { FunctionComponent, useState } from 'react'
import { Button, Modal, Space, Tooltip } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { emitNewGame } from '../../../../services/socket'
import { openNotification } from '../../../../services/notification'
import { addGameAction, gameForBoardIdSelector, gamesState, timerState } from '../../../../atoms/games.atom'
import { IGame } from '../../../../types/game'
import { IInitBoard } from '../../../../types/initBoard'
import { saveGame } from '../../../../services/manager'
import { tableStats } from '../../../../atoms/tableStats'
import styles from './MDModalNewGame.module.css'
import { listState } from '../../../../atoms/listState'

interface MDModalNewGameProps {
  onCancel: () => void
  visible: boolean
  boardId: string
}

const MDModalNewGame: FunctionComponent<MDModalNewGameProps> = ({ onCancel, visible, boardId }) => {
  const game = useRecoilValue(gameForBoardIdSelector(boardId))
  const [games, setGames] = useRecoilState(gamesState)
  const addGame = addGameAction(setGames)
  const oldGame = useRecoilValue(gamesState)
  const stopedTimer = useSetRecoilState(timerState)
  const setTableStats = useSetRecoilState(tableStats)
  const [firstPlayerName, setFirstPlayerName] = useState<string>('Player 1')
  const [secondPlayerName, setSecondPlayerName] = useState<string>('Player 2')
  const [list, setList] = useRecoilState(listState)

  const onListOne = () => {
    if (list.length > 0) {
      setFirstPlayerName(list[0])
      setList((prev) => {
        const arr = prev.slice(1)
        return arr
      })
    }
  }

  const onListTwo = () => {
    if (list.length > 0) {
      setSecondPlayerName(list[0])
      setList((prev) => {
        const arr = prev.slice(1)
        return arr
      })
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  const onFinish = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    stopedTimer(false)
    const initBoard: IInitBoard = {
      boardId,
      firstPlayer: firstPlayerName,
      secondPlayer: secondPlayerName,
    }
    if (oldGame.length > 0) saveGame(oldGame[oldGame.length - 1], setTableStats)
    emitNewGame(initBoard, (newGame: IGame) => {
      if (!newGame) {
        openNotification({
          title: 'Erreur, on a pas pu lancer une nouvelle partie..',
          type: 'error',
        })
      }

      if (game) {
        const players = [
          {
            name: initBoard.firstPlayer!,
            turn: game!.players[0].turn,
            score: game!.players[0].score,
          },
          {
            name: initBoard.secondPlayer!,
            turn: game!.players[1].turn,
            score: game!.players[1].score,
          },
        ]
        const newGameData = {
          id: game!.id,
          boardId: game!.boardId,
          players,
          startedAt: game!.startedAt,
          finishedAt: game!.finishedAt,
          history: game!.history,
        }
        setGames(() => [...games.filter(({ id }) => id !== newGameData.id), newGameData])
      }

      addGame(newGame)
      openNotification({
        title: 'Une nouvelle partie a été lancé',
      })
    })
    onCancel()
  }

  return (
    <div>
      <Modal
        title="New Game"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button onClick={onFinish} key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <form>
          <Space className={styles.space}>
            <input
              name="firstPlayer"
              id="firstPlayer"
              style={{ width: 260 }}
              value={firstPlayerName}
              onChange={(e) => setFirstPlayerName(e.target.value)}
            />
            <Tooltip title="Take player from waiting list">
              <FileTextOutlined onClick={onListOne} className={styles.icon} />
            </Tooltip>
          </Space>
          <Space className={styles.space}>
            <input
              name="secondPlayer"
              id="secondPlayer"
              style={{ width: 260 }}
              value={secondPlayerName}
              onChange={(e) => setSecondPlayerName(e.target.value)}
            />
            <Tooltip title="Take player from waiting list">
              <FileTextOutlined onClick={onListTwo} className={styles.icon} />
            </Tooltip>
          </Space>
        </form>
      </Modal>
    </div>
  )
}

export default MDModalNewGame
