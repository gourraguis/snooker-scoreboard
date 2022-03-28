import { Button, Select, DatePicker, Form } from 'antd'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { managersStats, tablesStats } from '../../../atoms/mainStats'
import { statisticsState } from '../../../atoms/statistics'
import { getStatisticsByFilter } from '../../../services/owner-api'
import styles from './ODSelector.module.css'

const { RangePicker } = DatePicker

const rangeConfig = {
  rules: [{ required: true, message: 'Please select time!' }],
}

export const ODSelector: FunctionComponent = () => {
  const tablesElements = useRecoilValue(tablesStats)
  const managersElements = useRecoilValue(managersStats)
  const setStatistics = useSetRecoilState(statisticsState)
  const [isFetching, setIsFetching] = useState(false)

  const onFinish = async (fieldsValue: any) => {
    setIsFetching(true)
    const values = {
      managerId: fieldsValue.manager,
      tableId: fieldsValue.table,
      startDate: fieldsValue.startDate.format('YYYY-MM-DD'),
      endDate: fieldsValue.endDate.format('YYYY-MM-DD'),
    }

    await getStatisticsByFilter(values, setStatistics)
    setIsFetching(false)
  }

  return (
    <Form className={styles.all} name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="manager" className={styles.item}>
        <Select showSearch placeholder="Select Manager">
          {managersElements.map((elem) => (
            <Select.Option value={elem.id}>{elem.name}</Select.Option>
          ))}
          <Select.Option value="">Any Manager</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="table" className={styles.item}>
        <Select showSearch placeholder="Select Table">
          {tablesElements.map((elem) => (
            <Select.Option value={elem.id}>{elem.name}</Select.Option>
          ))}
          <Select.Option value="">Any Table</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item className={styles.item} name="startDate" {...rangeConfig}>
        <DatePicker className={styles.date} placeholder="Select Start Date" />
      </Form.Item>
      <Form.Item className={styles.item} name="endDate" {...rangeConfig}>
        <DatePicker className={styles.date} placeholder="Select End Date" />
      </Form.Item>
      <Button className={styles.button} type="primary" htmlType="submit" loading={isFetching}>
        Search
      </Button>
    </Form>
  )
}
