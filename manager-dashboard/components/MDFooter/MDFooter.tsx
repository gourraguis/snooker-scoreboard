import { Layout, Typography } from 'antd'
import { FunctionComponent } from 'react'

const { Footer } = Layout
const { Paragraph } = Typography

export const MDFooter: FunctionComponent = () => (
  <Footer style={{ textAlign: 'center' }}>
    <Paragraph>Jawad Club © 2022</Paragraph>
  </Footer>
)
