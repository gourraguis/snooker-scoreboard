import { Button, Select, DatePicker } from 'antd'
import { FunctionComponent } from 'react'
import styles from './ODSelector.module.css'

const { Option } = Select

export const ODSelector: FunctionComponent = () => {
  const onChange = (value: any) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (val: any) => {
    console.log('search:', val)
  }
  return (
    <div className={styles.all}>
      <Select
        className={styles.item}
        showSearch
        placeholder="Select Manager"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
      <Select
        className={styles.item}
        showSearch
        placeholder="Select Table"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
      <DatePicker placeholder="Select Start Date" className={styles.item} onChange={onChange} />
      <DatePicker placeholder="Select End Date" className={styles.item} onChange={onChange} />
      <Button className={styles.button} type="primary">
        Search
      </Button>
    </div>
  )
}
