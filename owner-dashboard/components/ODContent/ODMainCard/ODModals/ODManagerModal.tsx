import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { createManager } from '../../../../services/owner'
import { IManager } from '../../../../types/manager'

interface ODManagerModalProps {
  onCancel: () => void
  visible: boolean
}

const ODManagerModal: FunctionComponent<ODManagerModalProps> = ({ onCancel, visible }) => {
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: IManager) => {
    const manager: IManager = {
      phoneNumber: values.phoneNumber,
      name: values.name,
    }
    createManager(manager)
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phoneNumber">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODManagerModal
