import { FunctionComponent } from 'react'
import { Layout, Typography } from 'antd'

import styles from './MDHeader.module.css'

const { Header } = Layout
const { Title } = Typography

export const MDHeader: FunctionComponent = () => (
  <Header className={styles.header}>
    <Title level={2} className={styles.title}>
      Manager Dashboard
    </Title>
  </Header>
)
