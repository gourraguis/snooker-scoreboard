import classNames from 'classnames'
import { Layout, Empty, Space } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { managerBoardsState } from '../../atoms/boards.atom'
import { MDBoard } from './MDBoard/MDBoard'
import { getBoards } from '../../services/api'
import styles from './MDContent.module.css'

const { Content } = Layout

export const MDContent: FunctionComponent = () => {
  const [managerBoards, setManagerBoards] = useRecoilState(managerBoardsState)

  const setBoards = async () => {
    const boards = await getBoards()
    setManagerBoards(boards)
  }

  useEffect(() => {
    setBoards()
  }, [])

  return (
    <Content className={classNames({ [styles.contentCentered]: !managerBoards.length })}>
      {!managerBoards?.length ? (
        <Empty description="Aucune table n'est connectée, veuillez demander à votre responsable d'ajouter les tables sur son compte." />
      ) : (
        <Space direction="vertical" className={styles.space}>
          {managerBoards.map((board, index) => (
            <MDBoard
              board={board}
              key={index}
              dailyGames={board.dailyGames || 0}
              weeklyGames={board.weeklyGames || 0}
            />
          ))}
        </Space>
      )}
    </Content>
  )
}
