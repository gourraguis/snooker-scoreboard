import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Form, Input, Button, Layout, Card } from 'antd'

import { useSetRecoilState } from 'recoil'
import styles from './ODLogin.module.css'
import { ILogin } from '../../types/login'
import { loginOwner } from '../../services/owner'
import { authState } from '../../atoms/authState'

const { Content } = Layout

export const ODLogin: FunctionComponent = () => {
  const router = useRouter()
  const setAuth = useSetRecoilState(authState)
  const onFinish = (values: ILogin) => {
    loginOwner(values, setAuth)
    router.push('/')
  }

  return (
    <Content className={styles.content}>
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
    </Content>
  )
}
