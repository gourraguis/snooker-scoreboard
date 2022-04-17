import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { ownerManagersState } from '../../../../atoms/managers.atom'
import { createManager } from '../../../../services/api'
import { IManager } from '../../../../types/manager'

interface ODManagerModalProps {
  onCancel: () => void
  visible: boolean
}

const ODManagerModal: FunctionComponent<ODManagerModalProps> = ({ onCancel, visible }) => {
  const [ownerManagers, setOwnerManagers] = useRecoilState(ownerManagersState)

  const onFinish = async (values: IManager) => {
    const newManager: IManager = {
      id: values.id,
      name: values.name,
    }
    await createManager(newManager)
    setOwnerManagers([
      ...ownerManagers,
      {
        ...newManager,
        dailyGames: 0,
        weeklyGames: 0,
      },
    ])
    onCancel()
  }

  return (
    <div>
      <Modal
        title="Ajouter un Gérant"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button form="addManager" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <Form
          id="addManager"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="id">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODManagerModal
