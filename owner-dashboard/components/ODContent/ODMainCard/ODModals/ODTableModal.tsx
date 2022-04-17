import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { ownerBoardsState } from '../../../../atoms/boards.atom'
import { createBoard } from '../../../../services/api'
import { IBoard } from '../../../../types/board'

interface ODTableFormProps {
  onCancel: () => void
  visible: boolean
}

const ODTableForm: FunctionComponent<ODTableFormProps> = ({ onCancel, visible }) => {
  const [ownerBoards, setOwnerBoards] = useRecoilState(ownerBoardsState)
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = async (values: IBoard) => {
    const BoardId = Math.floor(Math.random() * 10000).toString()
    const newBoard: IBoard = {
      id: BoardId,
      name: values.name,
    }
    await createBoard(newBoard)
    setOwnerBoards([
      ...ownerBoards,
      {
        ...newBoard,
        dailyGames: 0,
        weeklyGames: 0,
      },
    ])
    onCancel()
  }

  return (
    <div>
      <Modal
        title="Ajouter une Table"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button form="addTable" key="submit" htmlType="submit" type="primary">
            Ajouter la nouvelle table
          </Button>,
        ]}
      >
        <Form id="addTable" onFinish={onFinish} autoComplete="off">
          <Form.Item label="Nom de la table" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODTableForm
