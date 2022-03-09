import React, { FunctionComponent } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { emitNewGame } from '../../../../services/socket'
import { openNotification } from '../../../../services/notification'
import { addGameAction, gameForBoardIdSelector, gamesState } from '../../../../atoms/games.atom'
import { IGame } from '../../../../types/game'
import { IInitBoard } from '../../../../types/initBoard'
import { saveGame } from '../../../../services/manager'

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

  const handleCancel = () => {
    onCancel()
  }

  const onFinish = (values: { firstPlayer: string; secondPlayer: string }) => {
    const initBoard: IInitBoard = {
      boardId,
      firstPlayer: values.firstPlayer,
      secondPlayer: values.secondPlayer,
    }
    if (oldGame.length > 0) saveGame(oldGame[oldGame.length - 1])
    emitNewGame(initBoard, (newGame: IGame) => {
      if (!newGame) {
        openNotification({
          title: 'Erreur, on a pas pu lancer une nouvelle partie..',
          type: 'error',
        })
      }

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
          <Button form="addTable" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <Form
          id="addTable"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            firstPlayer: 'Player 1',
            secondPlayer: 'Player 2',
          }}
        >
          <Form.Item label="Player 1" name="firstPlayer">
            <Input />
          </Form.Item>
          <Form.Item label="Player 2" name="secondPlayer">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MDModalNewGame
