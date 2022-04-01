import { Input, List } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { listState } from '../../atoms/listState'
import styles from './MDList.module.css'

const { Search } = Input

export const MDList: FunctionComponent = () => {
  const [list, setState] = useRecoilState(listState)

  const onAdd = (value: string) => {
    if (value) setState((oldState) => [...oldState, value])
  }

  return (
    <div className={styles.all}>
      <Search
        className={styles.addSection}
        placeholder="Ajouter un joueur en liste d'attente"
        allowClear
        enterButton="Ajouter"
        size="large"
        onSearch={onAdd}
      />
      <List
        className={styles.list}
        size="large"
        header={<div className={styles.header}>Players</div>}
        bordered
        dataSource={list}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}
