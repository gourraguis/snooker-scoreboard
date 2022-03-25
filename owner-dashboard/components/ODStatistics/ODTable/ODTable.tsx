/* eslint-disable no-plusplus */
import { Table } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { statisticsState } from '../../../atoms/statistics'
import styles from './ODTable.module.css'

const columns = [
  {
    title: 'Manager',
    dataIndex: 'loser',
    width: '30%',
  },
  {
    title: 'Table',
    dataIndex: 'tablee',
    width: '30%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data: any[] = []

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}
export const ODTable: FunctionComponent = () => {
  const stats = useRecoilValue(statisticsState)

  useEffect(() => {
    console.log(stats)
  }, [stats])

  return (
    <div className={styles.all}>
      <Table columns={columns} dataSource={stats} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    </div>
  )
}
