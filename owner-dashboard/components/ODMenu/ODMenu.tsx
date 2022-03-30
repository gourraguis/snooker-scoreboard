import { BarChartOutlined, HomeFilled, SettingFilled } from '@ant-design/icons'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import styles from './ODMenu.module.css'

export const ODMenu: FunctionComponent = () => {
  const router = useRouter()

  const handleClick = (e: any) => {
    console.log('click ', e.key)
  }

  return (
    <Menu onClick={handleClick} className={styles.menu} defaultSelectedKeys={['1']} mode="horizontal">
      <Menu.Item onClick={() => router.push('/')} className={styles.item} key="1">
        <HomeFilled className={styles.icon} />
      </Menu.Item>
      <Menu.Item onClick={() => router.push('/statistics')} className={styles.item} key="2">
        <BarChartOutlined className={styles.icon} />
      </Menu.Item>
      <Menu.Item onClick={() => router.push('/settings')} className={styles.item} key="3">
        <SettingFilled className={styles.icon} />
      </Menu.Item>
    </Menu>
  )
}
