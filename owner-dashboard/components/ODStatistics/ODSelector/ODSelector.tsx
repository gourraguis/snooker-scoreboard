import { Button, Select, DatePicker, Form } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { managersStats, tablesStats } from '../../../atoms/mainStats'
import styles from './ODSelector.module.css'

const { RangePicker } = DatePicker

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
}

export const ODSelector: FunctionComponent = () => {
  const tablesElements = useRecoilValue(tablesStats)
  const managersElements = useRecoilValue(managersStats)

  const onFinish = (fieldsValue: any) => {
    const rangeValue = fieldsValue['range-picker']
    const values = {
      managerId: fieldsValue.manager,
      tableId: fieldsValue.table,
      startDate: rangeValue[0].format('YYYY-MM-DD'),
      endDate: rangeValue[1].format('YYYY-MM-DD'),
    }
    console.log(values)
  }

  return (
    <Form className={styles.all} name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="manager" className={styles.item}>
        <Select showSearch placeholder="Select Manager">
          {managersElements.map((elem) => (
            <Select.Option value={elem.id}>{elem.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="table" className={styles.item}>
        <Select showSearch placeholder="Select Table">
          {tablesElements.map((elem) => (
            <Select.Option value={elem.id}>{elem.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item className={styles.item} name="range-picker" {...rangeConfig}>
        <RangePicker className={styles.date} />
      </Form.Item>
      <Button className={styles.button} type="primary" htmlType="submit">
        Search
      </Button>
    </Form>
  )
}
