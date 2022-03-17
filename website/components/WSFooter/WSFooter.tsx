import { Layout, Typography } from 'antd'
import { FunctionComponent } from 'react'

import styles from './WSFooter.module.css'

const { Footer } = Layout
const { Paragraph } = Typography

export const WSFooter: FunctionComponent = () => (
  <Footer className={styles.footer}>
    <Paragraph>Copyright © 2022 Club</Paragraph>
  </Footer>
)
