import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { managersStats } from '../../../../atoms/mainStats'
import { createManager } from '../../../../services/owner-api'
import { IManager } from '../../../../types/manager'

interface ODManagerModalProps {
  onCancel: () => void
  visible: boolean
}

const ODManagerModal: FunctionComponent<ODManagerModalProps> = ({ onCancel, visible }) => {
  const [managersElements, setManagersElements] = useRecoilState(managersStats)
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = async (values: IManager) => {
    const phoneNumber = localStorage.getItem('phoneNumber')
    const newManager: IManager = {
      id: values.id,
      name: values.name,
      owner: phoneNumber,
    }
    createManager(newManager, managersElements, setManagersElements)
    onCancel()
  }

  return (
    <div>
      <Modal
        title="Add Manager"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
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
