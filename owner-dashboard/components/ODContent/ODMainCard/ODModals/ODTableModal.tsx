import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { createTable } from '../../../../services/owner'
import { ITable } from '../../../../types/table'

interface ODTableFormProps {
  onCancel: () => void
  visible: boolean
}

const ODTableForm: FunctionComponent<ODTableFormProps> = ({ onCancel, visible }) => {
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: ITable) => {
    const x = createTable(values)
    console.log(x)

    onCancel()
  }

  return (
    <div>
      <Modal
        title="Add Table"
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
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODTableForm
