import { Button, Select, DatePicker, Form } from 'antd'
import { FunctionComponent, useState } from 'react'
import styles from './ODSelector.module.css'

const { Option } = Select
const { RangePicker } = DatePicker

const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select time!' }],
}

export const ODSelector: FunctionComponent = () => {
  const [selectedManager, setSelectedManager] = useState()
  const [selectedTable, setSelectedTable] = useState()

  const onFinish = (fieldsValue: { [x: string]: any }) => {
    const rangeValue = fieldsValue['range-picker']
    const values = {
      manager: selectedManager,
      table: selectedTable,
      startDate: rangeValue[0].format('YYYY-MM-DD'),
      endDate: rangeValue[1].format('YYYY-MM-DD'),
    }
    console.log('Received values of form: ', values)
  }

  return (
    <Form className={styles.all} name="time_related_controls" onFinish={onFinish}>
      <Select
        className={styles.item}
        showSearch
        placeholder="Select Manager"
        optionFilterProp="children"
        onChange={(value) => setSelectedManager(value)}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
      <Form.Item className={styles.item}>
        <Select showSearch placeholder="Select Table" onChange={(value) => setSelectedTable(value)}>
          <Select.Option value="table1">table 1</Select.Option>
          <Select.Option value="table2">table 2</Select.Option>
          <Select.Option value="table3">table 3</Select.Option>
          <Select.Option value="table4">table 4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item className={styles.item} name="range-picker" {...rangeConfig}>
        <RangePicker className={styles.item} />
      </Form.Item>
      <Button className={styles.button} type="primary" htmlType="submit">
        Search
      </Button>
    </Form>
  )
}
