import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Button, Layout, Typography } from 'antd'

import { useRecoilState } from 'recoil'
import styles from './ODHeader.module.css'
import { authState } from '../../atoms/authState'

const { Header } = Layout
const { Title } = Typography

export const ODHeader: FunctionComponent = () => {
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('accToken')
    setIsAuth(false)
    router.push('/login')
  }
  return (
    <Header className={styles.header}>
      <Title level={2} className={styles.title}>
        Owner Dashboard
      </Title>
      {isAuth && (
        <Button className={styles.button} onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Header>
  )
}
