import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Form, Input, Button, Layout, Card } from 'antd'

import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './ODLogin.module.css'
import { ILogin } from '../../types/login'
import { checkOtp, loginOwner } from '../../services/owner'
import { authState, otpModalState } from '../../atoms/authState'

const { Content } = Layout

export const ODLogin: FunctionComponent = () => {
  const [otpVerif, setOtpVerif] = useRecoilState(otpModalState)
  const setAuth = useSetRecoilState(authState)
  const router = useRouter()

  const handleCancel = () => {
    setOtpVerif(false)
  }
  const onFinish = (values: ILogin) => {
    loginOwner(values, setOtpVerif)
  }

  const onFinishOtp = (values: { code: string }) => {
    checkOtp(values.code, setAuth, setOtpVerif, router)
  }

  return (
    <Content className={styles.content}>
      {!otpVerif && (
        <Card title="Login Form" bordered={false} style={{ width: 300 }}>
          <Form
            name="login"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input placeholder="Phone Number!" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      {otpVerif && (
        <Card title="Veuillez insérer le code" bordered={false} style={{ width: 300 }}>
          <Form
            name="login"
            wrapperCol={{ span: 22 }}
            initialValues={{ remember: true }}
            onFinish={onFinishOtp}
            autoComplete="off"
          >
            <Form.Item name="code">
              <Input placeholder="Code!" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Button type="primary" style={{ margin: '0 29px' }} onClick={handleCancel}>
                Chnage phone
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </Content>
  )
}
