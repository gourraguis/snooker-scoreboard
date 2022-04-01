import { Table } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { statisticsState } from '../../../atoms/statistics'
import styles from './ODTable.module.css'

const columns = [
  {
    title: 'Manager',
    dataIndex: 'manager',
    width: '30%',
  },
  {
    title: 'Table',
    dataIndex: 'table',
    width: '30%',
  },
  {
    title: 'Durée du match',
    dataIndex: 'duration',
  },
]

export const ODTable: FunctionComponent = () => {
  const stats = useRecoilValue(statisticsState)

  return (
    <div className={styles.all}>
      <Table columns={columns} dataSource={stats} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </div>
  )
}