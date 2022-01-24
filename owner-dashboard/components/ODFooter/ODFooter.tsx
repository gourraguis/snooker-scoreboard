import { Layout, Typography } from 'antd'
import { FunctionComponent } from 'react'

const { Footer } = Layout
const { Paragraph } = Typography

export const ODFooter: FunctionComponent = () => (
  <Footer style={{ textAlign: 'center' }}>
    <Paragraph>Owner Dashboard © 2022</Paragraph>
  </Footer>
)
