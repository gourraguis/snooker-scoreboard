import { Button, Select, DatePicker, Form } from 'antd'
import { FunctionComponent, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { ownerBoardsState } from '../../../atoms/boards.atom'
import { ownerManagersState } from '../../../atoms/managers.atom'
import { statsState } from '../../../atoms/statsState'
import { getStatsByFilter } from '../../../services/api'
import styles from './ODSelector.module.css'

const rangeConfig = {
  rules: [{ required: true, message: 'Please select time!' }],
}

export const ODSelector: FunctionComponent = () => {
  const ownerBoards = useRecoilValue(ownerBoardsState)
  const ownerManagers = useRecoilValue(ownerManagersState)
  const setStatistics = useSetRecoilState(statsState)
  const [isFetching, setIsFetching] = useState(false)

  const onFinish = async (fieldsValue: any) => {
    setIsFetching(true)
    const values = {
      managerId: fieldsValue.managerId,
      boardId: fieldsValue.boardId,
      startDate: fieldsValue.startDate,
      endDate: fieldsValue.endDate,
    }

    const stats = await getStatsByFilter(values)
    setStatistics(stats)
    setIsFetching(false)
  }

  return (
    <Form className={styles.all} name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="managerId" className={styles.item}>
        <Select showSearch placeholder="Select Manager">
          {ownerManagers.map((elem) => (
            <Select.Option value={elem.id}>{elem.name}</Select.Option>
          ))}
          <Select.Option value="">Any Manager</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="boardId" className={styles.item}>
        <Select showSearch placeholder="Select Table">
          {ownerBoards.map((elem) => (
            <Select.Option key={elem.id} value={elem.id}>
              {elem.name}
            </Select.Option>
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
        Rechercher
      </Button>
    </Form>
  )
}
