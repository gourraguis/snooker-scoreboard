import classNames from 'classnames'
import { Layout, Empty, Space } from 'antd'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { boardsState } from '../../atoms/boards.atom'
import { MDBoard } from './MDBoard/MDBoard'
import { getBoards, getGamesStats } from '../../services/manager'
import styles from './MDContent.module.css'
import { ICardElements } from '../../types/cardElement'
import { gamesState } from '../../atoms/games.atom'

const { Content } = Layout

export const MDContent: FunctionComponent = () => {
  const [boards, setBoards] = useRecoilState(boardsState)
  const [stats, setStats] = useState<ICardElements[]>([])
  const oldGame = useRecoilValue(gamesState)
  useEffect(() => {
    getBoards(setBoards)
  }, [])

  const getStats = async () => {
    await getGamesStats(setStats)
  }
  useEffect(() => {
    getStats()
  }, [oldGame])

  return (
    <Content className={classNames({ [styles.contentCentered]: !boards.length })}>
      {!boards?.length ? (
        <Empty description="Aucune table n'est connectée, veuillez demander à votre responsable d'ajouter les tables sur son compte." />
      ) : (
        <Space direction="vertical" className={styles.space}>
          {boards.map((board, index) => (
            <MDBoard
              board={board}
              key={index}
              dailyScore={stats[index]?.dailyScore || 0}
              weeklyScore={stats[index]?.weeklyScore || 0}
            />
          ))}
        </Space>
      )}
    </Content>
  )
}
