import { Layout, Space } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { managersStats, tablesStats } from '../../atoms/mainStats'
import { getManagers, getBoards } from '../../services/owner-api'

import styles from './ODContent.module.css'
import { ODHeadingCard } from './ODHeadingCard/ODHeadingCard'
import ODMainCard from './ODMainCard/ODMainCard'

const { Content } = Layout

export const ODContent: FunctionComponent = () => {
  const [tablesElements, setTablesElements] = useRecoilState(tablesStats)
  const [managersElements, setManagersElements] = useRecoilState(managersStats)

  useEffect(() => {
    getBoards(setTablesElements)
    getManagers(setManagersElements)
  }, [])

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
