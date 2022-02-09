import classNames from 'classnames'
import { Layout, Empty, Space } from 'antd'
import { FunctionComponent, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { boardsState } from '../../atoms/boards.atom'
import { MDBoard } from './MDBoard/MDBoard'
import { getBoards } from '../../services/manager'
import styles from './MDContent.module.css'

const { Content } = Layout

export const MDContent: FunctionComponent = () => {
  const [boards, setBoards] = useRecoilState(boardsState)
  useEffect(() => {
    getBoards(setBoards)
  }, [])

  return (
    <Content className={classNames({ [styles.contentCentered]: !boards.length })}>
      {!boards?.length ? (
        <Empty description="Aucune table n'est connectée, veuillez demander à votre responsable d'ajouter les tables sur son compte." />
      ) : (
        <Space direction="vertical" className={styles.space}>
          {boards.map((board) => (
            <MDBoard board={board} key={board.id} />
          ))}
        </Space>
      )}
    </Content>
  )
}
