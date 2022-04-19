import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { Col, Empty, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Head from 'next/head'
import { currentTurnSelector, historyState, playersScoreSelector } from '../../atoms/history'
import { initSocket } from '../../services/sockets'
import { boardState } from '../../atoms/board.atom'
import { gameState, sendGameData, stopTimerAction, timerState, updatePlayerNameAction } from '../../atoms/game.atom'
import SCHeading from './SCHeader/SCHeader'
import SCGameDetails from './SCGameDetails/SCGameDetails'
import SCHistory from './SCHistory/SCHistory'

import styles from './SCContent.module.css'
import { addGameAction, globalScoreState } from '../../atoms/globalScore.atom'
import { SCControls } from './SCControls/SCControls'
import { SCPlayerCard } from './SCPlayerCard/SCPlayerCard'

const SCContent = () => {
  const [board, setBoard] = useRecoilState(boardState)
  const [game, setGame] = useRecoilState(gameState)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const [globalScore, setGlobalScoreState] = useRecoilState(globalScoreState)
  const setHistory = useSetRecoilState(historyState)
  const [showGlobalScore, setShowGlobalScore] = useState(false)
  const setStopTimer = useSetRecoilState(timerState)
  const router = useRouter()
  const id = router?.query?.id as string
  const showControls = !!router?.query?.showControls

  useEffect(() => {
    if (!id) {
      return
    }
    initSocket(
      addGameAction(setGlobalScoreState, setGame, setHistory, setStopTimer),
      setBoard,
      id,
      updatePlayerNameAction(setGame),
      sendGameData(setGame, setHistory),
      stopTimerAction(setStopTimer)
    )
  }, [id])

  useEffect(() => {
    const found = globalScore.find((element) => element.score > 0)
    if (!found) setShowGlobalScore(false)
    else setShowGlobalScore(true)
  }, [globalScore])

  return (
    <Content className={styles.content}>
      {!id && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="BOARD ID IS NOT DEFINED" />
        </div>
      )}
      {id && !board && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="BOARD IS NOT CONNECTED TO API" />
        </div>
      )}
      {board && !game && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="GAME IS NOT STARTED" />
        </div>
      )}

      {board && game && (
        <>
          <div className={styles.centerHeading}>
            <SCHeading title={board.name} />
          </div>
          <Row gutter={16}>
            <Col span={8} className={styles.cent}>
              {game.players.map((player) => (
                <SCPlayerCard
                  isCurrent={currentTurn?.value === player.turn}
                  color={player.turn ? '#ef5350' : '#42a5f5'}
                  playerName={player.name}
                  points={playersScore[player.turn]}
                  globalScore={globalScore[player.turn].score}
                  showGlobalScore={showGlobalScore}
                  key={player.turn}
                />
              ))}
            </Col>
            <Col span={8} className={styles.col}>
              <SCGameDetails />
            </Col>
            <Col span={8} className={styles.col}>
              <SCHistory />
            </Col>
          </Row>
          <SCControls showControls={showControls} />
        </>
      )}
    </Content>
  )
}

export default SCContent
