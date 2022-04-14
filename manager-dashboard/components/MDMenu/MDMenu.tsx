import { BarChartOutlined, FileTextOutlined, HomeFilled } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import styles from './MDMenu.module.css'

const routes = ['/', '/stats', '/waitlist']

export const MDMenu: FunctionComponent = () => {
  const router = useRouter()
  return (
    <Menu className={styles.menu} selectedKeys={[router.pathname]} mode="horizontal">
      <Menu.Item key={routes[0]} onClick={() => router.push(routes[0])} className={styles.item}>
        <HomeFilled className={styles.icon} />
      </Menu.Item>
      <Menu.Item key={routes[1]} onClick={() => router.push(routes[1])} className={styles.item}>
        <BarChartOutlined className={styles.icon} />
      </Menu.Item>
      <Menu.Item key={routes[2]} onClick={() => router.push(routes[2])} className={styles.item}>
        <FileTextOutlined className={styles.icon} />
      </Menu.Item>
    </Menu>
  )
}
