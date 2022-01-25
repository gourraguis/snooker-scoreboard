import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'

interface ODManagerModalProps {
  onCancel: () => void
  visible: boolean
}

const ODManagerModal: FunctionComponent<ODManagerModalProps> = ({ onCancel, visible }) => {
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: string) => {
    console.log('Success:', values)
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
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODManagerModal
