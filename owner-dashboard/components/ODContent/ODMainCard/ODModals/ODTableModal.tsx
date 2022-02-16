import { Button, Form, Input, Modal } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { tablesStats } from '../../../../atoms/mainStats'
import { createTable } from '../../../../services/owner'
import { ITable } from '../../../../types/table'

interface ODTableFormProps {
  onCancel: () => void
  visible: boolean
}

const ODTableForm: FunctionComponent<ODTableFormProps> = ({ onCancel, visible }) => {
  const [tablesElements, setTablesElements] = useRecoilState(tablesStats)
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: ITable) => {
    const phoneNumber = localStorage.getItem('phoneNumber')
    const BoardId = Math.floor(Math.random() * 1000).toString()
    const newTable: ITable = {
      id: BoardId,
      name: values.name,
      owner: phoneNumber,
    }
    createTable(newTable, tablesElements, setTablesElements)
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
