import classNames from 'classnames'
import { Layout, Space } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { managerBoardsState } from '../../atoms/boards.atom'
import { MDBoard } from './MDBoard/MDBoard'
import styles from './MDContent.module.css'

const { Content } = Layout

export const MDContent: FunctionComponent = () => {
  const managerBoards = useRecoilValue(managerBoardsState)

  return (
    <Content
      className={classNames({
        [styles.contentCentered]: !managerBoards.length,
        [styles.content]: managerBoards.length,
      })}
    >
      {!managerBoards?.length ? (
        <p style={{ textAlign: 'center', fontWeight: 500 }}>
          Aucune table n&apos;est connectée, veuillez demander à votre responsable d&apos;ajouter les tables sur son
          compte.
        </p>
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
