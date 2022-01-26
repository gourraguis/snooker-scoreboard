import { Layout, Empty, Space } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'
import { boardsState } from '../../atoms/boards.atom'
import { MDBoard } from './MDBoard/MDBoard'

import styles from './MDContent.module.css'

const { Content } = Layout

export const MDContent: FunctionComponent = () => {
  const boards = useRecoilValue(boardsState)
  // const boards: any = []

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
