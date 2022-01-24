import { FunctionComponent } from 'react'
import { Layout, Typography } from 'antd'

import styles from './ODHeader.module.css'

const { Header } = Layout
const { Title } = Typography

export const ODHeader: FunctionComponent = () => (
  <Header className={styles.header}>
    <Title level={2} className={styles.title}>
      Owner Dashboard
    </Title>
  </Header>
)
