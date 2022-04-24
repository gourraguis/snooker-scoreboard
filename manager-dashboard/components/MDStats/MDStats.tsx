import { Table } from 'antd'
import moment from 'moment'
import { FunctionComponent, useEffect, useState } from 'react'
import { getManagerStats } from '../../services/manager-api'
import { IStats } from '../../types/stats'
import styles from './MDStats.module.css'

const columns = [
  {
    title: 'Table',
    dataIndex: 'boardName',
    width: '30%',
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
    dataIndex: 'duration',
    width: '20%',
  },
]

export const MDStats: FunctionComponent = () => {
  const [stats, setStats] = useState<IStats[]>()

  const fetchStats = async () => {
    const fetchedStats = await getManagerStats()
    setStats(
      fetchedStats.map((line) => ({
        ...line,
        duration: moment(moment(line.finishedAt).diff(line.startedAt)).format('mm:ss'),
      }))
    )
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <main className={styles.content}>
      <Table columns={columns} dataSource={stats} pagination={false} bordered />
    </main>
  )
}
