import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { Form, Input, Button, Layout, Card } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import { generateOtpOwner, loginOwner } from '../../services/owner-api'

import styles from './ODLogin.module.css'
import { validatePhoneNumber } from '../../services/utils'

const { Content } = Layout

export const ODLogin: FunctionComponent = () => {
  const router = useRouter()
  const [isFetching, setIsFetching] = useState(false)
  const [formPhoneNumber, setFormPhoneNumber] = useState('')

  const onPhoneNumberSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
    setIsFetching(true)
    const isValid = await generateOtpOwner(phoneNumber)
    if (isValid) {
      setFormPhoneNumber(phoneNumber)
    }
    setIsFetching(false)
  }

  const onOtpSubmit = async ({ otp }: { otp: string }) => {
    setIsFetching(true)
    const jwtToken = await loginOwner(formPhoneNumber, otp)
    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken)
      router.push('/')
    }
    setIsFetching(false)
  }

  return (
    <Content className={styles.content}>
      <AnimatePresence exitBeforeEnter>
        {formPhoneNumber ? (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -40 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.55 }}
          >
            <Card title="Veuillez insérer le code" bordered={false} style={{ width: 300 }}>
              <Form name="otpForm" wrapperCol={{ span: 22 }} onFinish={onOtpSubmit}>
                <Form.Item
                  name="otp"
                  rules={[{ required: true, message: `Veuillez entrer votre code  d'authentification` }]}
                >
                  <Input placeholder="Code reçu par sms" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" loading={isFetching}>
                    Se connecter
                  </Button>
                  <Button type="primary" style={{ margin: '0 29px' }} onClick={() => setFormPhoneNumber('')}>
                    Changer le numéro de téléphone
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -60 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.55 }}
          >
            <Card title="Login Form" style={{ width: 300 }}>
              <Form name="phoneNumberForm" onFinish={onPhoneNumberSubmit}>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Veuillez entrer votre numéro de téléphone' },
                    () => ({
                      validator(_, value) {
                        if (!value || validatePhoneNumber(value)) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Veuillez entrer un numéro de téléphone valide'))
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Votre numéro de téléphone" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className={styles.nextButton} htmlType="submit" loading={isFetching}>
                    Suivant
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </Content>
  )
}
