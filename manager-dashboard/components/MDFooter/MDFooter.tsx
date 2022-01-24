import { Layout, Typography } from 'antd'
import { FunctionComponent } from 'react'

const { Footer } = Layout
const { Paragraph } = Typography

export const MDFooter: FunctionComponent = () => (
  <Footer style={{ textAlign: 'center' }}>
    <Paragraph>Manager Dashboard © 2021</Paragraph>
  </Footer>
)
