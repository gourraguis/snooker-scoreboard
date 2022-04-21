import { FunctionComponent } from 'react'
import { Layout, Typography } from 'antd'
import { useRecoilState } from 'recoil'
import styles from './ODHeader.module.css'
import { ownerState } from '../../atoms/ownerState'

const { Header } = Layout
const { Title } = Typography

export const ODHeader: FunctionComponent = () => {
  const [owner] = useRecoilState(ownerState)

  // const handleLogout = () => {
  //   localStorage.removeItem('jwtToken')
  //   setOwner(null)
  //   router.push('/login')
  // }

  return (
    <Header className={styles.header}>
      <Title level={2} className={styles.title}>
        {owner?.clubName || 'Jawad Club'}
      </Title>
      {/* {!!owner && (
        <Button className={styles.button} onClick={handleLogout}>
          <LogoutOutlined />
        </Button>
      )} */}
    </Header>
  )
}
