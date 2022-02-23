import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { Button, Layout, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import { useRecoilState } from 'recoil'
import styles from './ODHeader.module.css'
import { ownerState } from '../../atoms/ownerState'

const { Header } = Layout
const { Title } = Typography

export const ODHeader: FunctionComponent = () => {
  const [owner, setOwner] = useRecoilState(ownerState)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setOwner(null)
    router.push('/login')
  }

  return (
    <Header className={styles.header}>
      <Title level={2} className={styles.title}>
        Owner Dashboard
      </Title>
      {!!owner && (
        <Button className={styles.button} onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      )}
    </Header>
  )
}
