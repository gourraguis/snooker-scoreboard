import React, { FunctionComponent } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useSetRecoilState } from 'recoil'
import { emitNewGame } from '../../../../services/socket'
import { openNotification } from '../../../../services/notification'
import { addGameAction, gamesState } from '../../../../atoms/games.atom'
import { IGame } from '../../../../types/game'
import { IInitBoard } from '../../../../types/initBoard'

interface MDModalNewGameProps {
  onCancel: () => void
  visible: boolean
  boardId: string
}

const MDModalNewGame: FunctionComponent<MDModalNewGameProps> = ({ onCancel, visible, boardId }) => {
  const setGames = useSetRecoilState(gamesState)
  const addGame = addGameAction(setGames)

  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: any) => {
    const initBoard: IInitBoard = {
      boardId,
      firstPlayer: values.firstPlayer,
      secondPlayer: values.secondPlayer,
    }
    emitNewGame(initBoard, (newGame: IGame) => {
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
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
