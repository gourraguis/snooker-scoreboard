import { Table } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { getManagerStatistics } from '../../../services/manager'
import { IStatiscis } from '../../../types/statistics'
import styles from './MDTable.module.css'

const columns = [
  {
    title: 'Table',
    dataIndex: 'table',
    width: '25%',
  },
  {
    title: 'Winner',
    dataIndex: 'winner',
    width: '25%',
  },
  {
    title: 'Loser',
    dataIndex: 'loser',
    width: '25%',
  },
  {
    title: 'Début du match',
    dataIndex: 'startedAt',
    width: '25%',
  },
]

export const MDTable: FunctionComponent = () => {
  const [stats, setStats] = useState<IStatiscis[]>()

  useEffect(() => {
    getManagerStatistics(setStats)
  }, [])

  return (
    <div className={styles.all}>
      <Table columns={columns} dataSource={stats} pagination={false} scroll={{ y: 320 }} />
    </div>
  )
}
