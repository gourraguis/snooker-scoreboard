import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { ownerManagersState } from '../../../../atoms/managers.atom'
import { createManager } from '../../../../services/api'
import { openNotification } from '../../../../services/notification'
import { IManager } from '../../../../types/manager'

interface ODManagerModalProps {
  onCancel: () => void
  visible: boolean
}

const ODManagerModal: FunctionComponent<ODManagerModalProps> = ({ onCancel, visible }) => {
  const [ownerManagers, setOwnerManagers] = useRecoilState(ownerManagersState)

  const onFinish = async ({ id, name }: IManager) => {
    const formattedPhone = id.replace(/\D/g, '').replace(/^212/, '0')
    const newManager: IManager = {
      id: formattedPhone,
      name,
    }
    try {
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
    } catch (error) {
      console.error(error)
      openNotification({
        title: 'Création du manager échoué, veuillez vérifier le numéro de téléphone',
      })
    }
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
