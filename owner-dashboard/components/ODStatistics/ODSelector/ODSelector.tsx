import { Button, Select, DatePicker, Form } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ownerBoardsState } from '../../../atoms/boards.atom'
import { ownerManagersState } from '../../../atoms/managers.atom'
import { statsState } from '../../../atoms/statsState'
import { getBoards, getManagers, getStatsByFilter } from '../../../services/api'
import styles from './ODSelector.module.css'

export const ODSelector: FunctionComponent = () => {
  const [ownerBoards, setOwnerBoards] = useRecoilState(ownerBoardsState)
  const [ownerManagers, setOwnerManagers] = useRecoilState(ownerManagersState)
  const setStats = useSetRecoilState(statsState)
  const [isFetching, setIsFetching] = useState(false)

  const setBoards = async () => {
    const boards = await getBoards()
    setOwnerBoards(boards)
  }

  const setManagers = async () => {
    const managers = await getManagers()
    setOwnerManagers(managers)
  }

  useEffect(() => {
    setBoards()
    setManagers()
  }, [])

  const onFinish = async (fieldsValue: any) => {
    setIsFetching(true)
    const values = {
      managerId: fieldsValue.managerId,
      boardId: fieldsValue.boardId,
      startDate: fieldsValue.startDate,
      finishDate: fieldsValue.finishDate,
    }

    const stats = await getStatsByFilter(values)
    setStats(stats)
    setIsFetching(false)
  }

  return (
    <Form className={styles.all} name="time_related_controls" onFinish={onFinish}>
      <Form.Item name="managerId" className={styles.item}>
        <Select showSearch placeholder="Choisir un manager">
          {ownerManagers.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.name}
            </Select.Option>
          ))}
          <Select.Option value="">Any Manager</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="boardId" className={styles.item}>
        <Select showSearch placeholder="Choisir une table">
          {ownerBoards.map((elem) => (
            <Select.Option key={elem.id} value={elem.id}>
              {elem.name}
            </Select.Option>
          ))}
          <Select.Option value="">Any Table</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item className={styles.item} name="startDate">
        <DatePicker className={styles.date} placeholder="Choisir une date de début" />
      </Form.Item>
      <Form.Item className={styles.item} name="finishDate">
        <DatePicker className={styles.date} placeholder="Choisir une date de fin" />
      </Form.Item>
      <Button className={styles.button} type="primary" htmlType="submit" loading={isFetching}>
        Rechercher
      </Button>
    </Form>
  )
}
