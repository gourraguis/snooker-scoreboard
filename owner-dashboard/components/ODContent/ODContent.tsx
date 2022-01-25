import { Layout, Space } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { managersStats, tablesStats } from '../../atoms/mainStats'

import styles from './ODContent.module.css'
import { ODHeadingCard } from './ODHeadingCard/ODHeadingCard'
import ODMainCard from './ODMainCard/ODMainCard'

const { Content } = Layout

export const ODContent: FunctionComponent = () => {
  const tablesElements = useRecoilValue(tablesStats)
  const managersElements = useRecoilValue(managersStats)
  return (
    <Content>
      <Space direction="vertical" className={styles.space}>
        <ODHeadingCard />
        <ODMainCard id="table" title="Tables" elements={tablesElements} />
        <ODMainCard id="manager" title="Managers" elements={managersElements} />
      </Space>
    </Content>
  )
}
