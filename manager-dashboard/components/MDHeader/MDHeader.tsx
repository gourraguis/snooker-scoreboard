import { FunctionComponent, useEffect, useState } from 'react'
import { Button, Layout, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import { useRouter } from 'next/router'
import styles from './MDHeader.module.css'

const { Header } = Layout
const { Title } = Typography

export const MDHeader: FunctionComponent = () => {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) setIsAuth(true)
    else setIsAuth(false)
  }, [isAuth])

  return (
    <Header className={styles.header}>
      <Title level={2} className={styles.title}>
        Owner Dashboard
      </Title>
      {!!isAuth && (
        <Button className={styles.button} onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      )}
    </Header>
  )
}
