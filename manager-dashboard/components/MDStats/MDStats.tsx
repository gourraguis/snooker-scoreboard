import { Table } from 'antd'
import moment from 'moment'
import { FunctionComponent, useEffect, useState } from 'react'
import { getManagerStats } from '../../services/manager-api'
import { IStats } from '../../types/stats'

const columns = [
  {
    title: 'Table',
    dataIndex: 'boardName',
    width: '30%',
  },
  {
    title: 'Gagnant',
    dataIndex: 'winner',
    width: '25%',
  },
  {
    title: 'Perdant',
    dataIndex: 'loser',
    width: '25%',
  },
  {
    title: 'Temps',
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

  return <Table columns={columns} dataSource={stats} pagination={false} bordered scroll={{ y: '80vh' }} />
}
