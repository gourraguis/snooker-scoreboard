import { BarChartOutlined, FileTextOutlined, HomeFilled } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import styles from './MDMenu.module.css'

export const MDMenu: FunctionComponent = () => {
  const router = useRouter()
  return (
    <Menu className={styles.menu} defaultSelectedKeys={['1']} mode="horizontal">
      <Menu.Item onClick={() => router.push('/')} className={styles.item} key="1">
        <HomeFilled className={styles.icon} />
      </Menu.Item>
      <Menu.Item onClick={() => router.push('/statistics')} className={styles.item} key="2">
        <BarChartOutlined className={styles.icon} />
      </Menu.Item>
      <Menu.Item onClick={() => router.push('/list')} className={styles.item} key="3">
        <FileTextOutlined className={styles.icon} />
      </Menu.Item>
    </Menu>
  )
}
