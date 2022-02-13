import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Form, Input, Button, Layout, Card } from 'antd'

import { useSetRecoilState } from 'recoil'
import styles from './SCLogin.module.css'
import { ILogin } from '../../types/login'
import { loginScoreBoard } from '../../services/scoreBoard'
import { authState } from '../../atoms/authState'

const { Content } = Layout

export const SCLogin: FunctionComponent = () => {
  const router = useRouter()
  const setAuth = useSetRecoilState(authState)
  const onFinish = (values: ILogin) => {
    loginScoreBoard(values, setAuth, router)
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
          <Form.Item name="id" rules={[{ required: true, message: 'Please input the Board ID!' }]}>
            <Input placeholder="Board ID" />
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
