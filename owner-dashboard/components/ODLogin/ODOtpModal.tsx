import { Button, Form, Input, Modal } from 'antd'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from '../../atoms/authState'
import { checkOtp } from '../../services/owner'

interface ODOtpModalProps {
  onCancel: () => void
  visible: boolean
}

const ODOtpModal: FunctionComponent<ODOtpModalProps> = ({ onCancel, visible }) => {
  const router = useRouter()
  const setAuth = useSetRecoilState(authState)
  const handleCancel = () => {
    onCancel()
  }
  const onFinish = (values: { code: string }) => {
    checkOtp(values.code, setAuth, router)
  }

  return (
    <div>
      <Modal
        title="Veuillez insérer le code"
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
          <Form.Item label="Code" name="code">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ODOtpModal
