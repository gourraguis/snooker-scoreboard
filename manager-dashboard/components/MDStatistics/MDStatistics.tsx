import { Table } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { getManagerStatistics } from '../../services/manager'
import { IStatistics } from '../../types/statistics'
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
  const [stats, setStats] = useState<IStatistics[]>()

  useEffect(() => {
    getManagerStatistics(setStats)
  }, [])

  return (
    <div className={styles.all}>
      <Table columns={columns} dataSource={stats} pagination={false} scroll={{ y: '80vh' }} />
    </div>
  )
}
