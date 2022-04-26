import { Table } from 'antd'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { statsState } from '../../../atoms/statsState'

const columns = [
  {
    title: 'Manager',
    dataIndex: 'managerName',
    width: '30%',
  },
  {
    title: 'Table',
    dataIndex: 'boardName',
    width: '30%',
  },
  {
    title: 'Date',
    dataIndex: 'startedAt',
    render: (startedAt: Date) => {
      const date = moment(startedAt)
      return (
        <>
          <p style={{ marginBottom: 0 }}>{date.format('DD/MM')}</p>
          <p>{date.format('HH:mm')}</p>
        </>
      )
    },
  },
]

export const ODTable: FunctionComponent = () => {
  const stats = useRecoilValue(statsState)

  return <Table columns={columns} dataSource={stats} pagination={false} scroll={{ y: '50vh' }} />
}
