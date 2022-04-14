import { Layout, Space } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { ownerBoardsState } from '../../atoms/boards.atom'
import { ownerManagersState } from '../../atoms/managers.atom'
import { getManagers, getBoards } from '../../services/api'

import styles from './ODContent.module.css'
import { ODHeadingCard } from './ODHeadingCard/ODHeadingCard'
import { ODMainCard } from './ODMainCard/ODMainCard'

const { Content } = Layout

export const ODContent: FunctionComponent = () => {
  const [ownerBoards, setOwnerBoards] = useRecoilState(ownerBoardsState)
  const [ownerManagers, setOwnerManagers] = useRecoilState(ownerManagersState)

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

  return (
    <Content>
      <Space direction="vertical" className={styles.space}>
        <ODHeadingCard />
        <ODMainCard id="boards" title="Tables" elements={ownerBoards} />
        <ODMainCard id="managers" title="Gérants" elements={ownerManagers} />
      </Space>
    </Content>
  )
}
