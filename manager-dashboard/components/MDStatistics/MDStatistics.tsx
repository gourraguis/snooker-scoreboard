import { Table } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { getManagerStats } from '../../services/api'
import { IStats } from '../../types/stats'
import styles from './MDStatistics.module.css'

const columns = [
  {
    title: 'Table',
    dataIndex: 'table',
    width: '25%',
  },
  {
    title: 'Rabe7',
    dataIndex: 'winner',
    width: '25%',
  },
  {
    title: 'Kahser',
    dataIndex: 'loser',
    width: '25%',
  },
  {
    title: 'We9t',
    dataIndex: 'startedAt',
    width: '25%',
  },
]

export const MDStatistics: FunctionComponent = () => {
  const [stats, setStats] = useState<IStats[]>()

  const fetchStats = async () => {
    const fetchedStats = await getManagerStats()
    setStats(fetchedStats)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className={styles.all}>
      <Table columns={columns} dataSource={stats} pagination={false} scroll={{ y: '100vh' }} />
    </div>
  )
}
