import { ClearOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Input, List } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { waitlistState } from '../../atoms/waitlist.atom'
import styles from './MDWaitList.module.css'

const { Search } = Input

export const MDList: FunctionComponent = () => {
  const [waitlist, setWaitlist] = useRecoilState(waitlistState)

  useEffect(() => {
    const prevWaitList = localStorage.getItem('waitlist')
    if (prevWaitList) {
      setWaitlist(JSON.parse(prevWaitList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('waitlist', JSON.stringify(waitlist))
  }, [waitlist])

  const addPlayer = (player: string) => {
    if (player) setWaitlist((prevWaitlist) => [...prevWaitlist, player])
  }

  const removePlayer = (player: string) => () => {
    setWaitlist((prevWaitlist) => prevWaitlist.filter((p) => p !== player))
  }

  return (
    <main className={styles.content}>
      <Search
        className={styles.addSection}
        addonBefore={<UserOutlined />}
        placeholder="Nom du joueur"
        allowClear
        enterButton={<PlusOutlined color="red" />}
        size="large"
        onSearch={addPlayer}
      />
      <List
        className={styles.list}
        size="large"
        header={<div className={styles.header}>Joueurs en attente</div>}
        locale={{ emptyText: 'Aucun joueur en attente.' }}
        bordered
        dataSource={waitlist}
        renderItem={(player) => (
          <List.Item className={styles.listItem}>
            {player}
            <a onClick={removePlayer(player)} style={{ color: '#212121' }}>
              <DeleteOutlined />
            </a>
          </List.Item>
        )}
      />
    </main>
  )
}
