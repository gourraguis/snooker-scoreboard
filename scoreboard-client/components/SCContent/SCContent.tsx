import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { Col, Empty, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Head from 'next/head'
import { currentTurnSelector, playersScoreSelector, historyState } from '../../atoms/history'
import { initSocket } from '../../services/sockets'
import { boardState } from '../../atoms/board.atom'
import { gameState } from '../../atoms/game.atom'
import { IGame } from '../../types/game'
import SCPlayerCard from './SCPlayerCard/SCPlayerCard'
import SCHeading from './SCHeader/SCHeader'
import SCGameDetails from './SCGameDetails/SCGameDetails'
import SCHistory from './SCHistory/SCHistory'

import styles from './SCContent.module.css'
import SCControls from './SCControls/SCControls'

const SCContent = () => {
  const [board, setBoard] = useRecoilState(boardState)
  const [game, setGame] = useRecoilState(gameState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const initHistory = useResetRecoilState(historyState)

  const startNewGame = (newGame: IGame) => {
    initHistory()
    setGame(newGame)
  }

  useEffect(() => {
    initSocket(startNewGame, setBoard)
  }, [])

  return (
    <Content className={styles.content}>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentCentered}>
        {!board && <Empty description="BOARD IS NOT CONNECTED TO API" />}
        {!!board && !game && <Empty description="GAME IS NOT STARTED" />}
      </div>
      {!!board && !!game && (
        <div>
          <div className={styles.centerHeading}>
            <SCHeading title={board.name} />
          </div>
          <Content>
            <Row>
              <Col span={6} offset={2} className={styles.col}>
                {game.players.map((player) => (
                  <SCPlayerCard
                    isCurrent={currentTurn.value === player.turn}
                    color={player.turn ? 'rgb(153 27 27)' : 'rgb(250 204 21)'}
                    playerName={player.name}
                    points={playersScore[player.turn]}
                    key={player.turn}
                  />
                ))}
              </Col>
              <Col span={6} offset={2} className={styles.col}>
                <SCGameDetails />
              </Col>
              <SCHistory />
            </Row>
            <SCControls />
          </Content>
        </div>
      )}
    </Content>
  )
}

export default SCContent
