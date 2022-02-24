import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { Col, Empty, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Head from 'next/head'
import { currentTurnSelector, historyState, playersScoreSelector } from '../../atoms/history'
import { initSocket } from '../../services/sockets'
import { boardState } from '../../atoms/board.atom'
import { gameState } from '../../atoms/game.atom'
import SCPlayerCard from './SCPlayerCard/SCPlayerCard'
import SCHeading from './SCHeader/SCHeader'
import SCGameDetails from './SCGameDetails/SCGameDetails'
import SCHistory from './SCHistory/SCHistory'

import styles from './SCContent.module.css'
import SCControls from './SCControls/SCControls'
import { addGameAction, globalScoreState } from '../../atoms/globalScore.atom'

const SCContent = () => {
  const [board, setBoard] = useRecoilState(boardState)
  const [game, setGame] = useRecoilState(gameState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const [globalScore, setGlobalScoreState] = useRecoilState(globalScoreState)
  const setHistory = useSetRecoilState(historyState)
  const [showGlobalScore, setShowGlobalScore] = useState(false)
  const router = useRouter()
  const id = router?.query?.id as string

  useEffect(() => {
    initSocket(addGameAction(setGlobalScoreState, setGame, setHistory), setBoard, id)
  }, [id])

  useEffect(() => {
    const found = globalScore.find((element) => element.score > 0)
    if (!found) setShowGlobalScore(false)
    else setShowGlobalScore(true)
  }, [globalScore])

  return (
    <Content className={styles.content}>
      <Head>
        <title>Snooker Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contentCentered}>
        {!board && <Empty className={styles.centered} description="BOARD IS NOT CONNECTED TO API" />}
        {!id && <Empty className={styles.centered} description="BOARD ID IS NOT DEFINED" />}
        {!!board && !game && <Empty className={styles.centered} description="GAME IS NOT STARTED" />}
      </div>
      {!!board && !!game && (
        <div>
          <div className={styles.centerHeading}>
            <SCHeading title={board.name} />
          </div>
          <Content>
            <Row>
              <Col span={6} offset={1}>
                {game.players.map((player) => (
                  <SCPlayerCard
                    isCurrent={currentTurn?.value === player.turn}
                    color={player.turn ? 'rgb(153 27 27)' : 'rgb(250 204 21)'}
                    playerName={player.name}
                    points={playersScore[player.turn]}
                    globalScore={globalScore[player.turn].score}
                    showGlobalScore={showGlobalScore}
                    key={player.turn}
                  />
                ))}
              </Col>
              <Col span={6} offset={2} className={styles.col}>
                <SCGameDetails />
              </Col>
              <Col span={6} offset={2} className={styles.col}>
                <SCHistory />
              </Col>
            </Row>
            <SCControls />
          </Content>
        </div>
      )}
    </Content>
  )
}

export default SCContent
