import { FunctionComponent } from 'react'
import { Button, Layout, Typography } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import styles from './MDHeader.module.css'
import { managerState } from '../../atoms/managerState'

const { Header } = Layout
const { Title } = Typography

export const MDHeader: FunctionComponent = () => {
  const [manager, setManager] = useRecoilState(managerState)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    setManager(null)
    router.push('/login')
  }

  return (
    <Header className={styles.header}>
      <Title level={2} className={styles.title}>
        {manager?.owner?.clubName || 'Jawad Club'}
      </Title>
      {!!manager && (
        <Button className={styles.button} onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      )}
    </Header>
  )
}
