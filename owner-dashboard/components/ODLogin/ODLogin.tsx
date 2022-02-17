import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { Form, Input, Button, Layout, Card } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [msgErr, setMsgErr] = useState('')

  const handleCancel = () => {
    setOtpVerif(false)
  }
  const onFinish = async (values: ILogin) => {
    await loginOwner(values, setOtpVerif, setMsgErr)
    console.log(msgErr)
  }

  const onFinishOtp = (values: { code: string }) => {
    checkOtp(values.code, setAuth, setOtpVerif, router, setMsgErr)
  }

  return (
    <Content className={styles.content}>
      {!otpVerif && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -60 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.55 }}
          >
            <Card title="Login Form" bordered={false} style={{ width: 300 }}>
              <Form
                name="login"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item name="phoneNumber">
                  <Input placeholder="Phone Number!" />
                </Form.Item>
                {msgErr && <p className={styles.err}>{msgErr}</p>}
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}
      {otpVerif && (
        <AnimatePresence exitBeforeEnter>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.55 }}
          >
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
                {msgErr && <p className={styles.err}>{msgErr}</p>}
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
          </motion.div>
        </AnimatePresence>
      )}
    </Content>
  )
}
