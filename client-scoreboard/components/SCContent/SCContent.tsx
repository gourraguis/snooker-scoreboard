import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { Col, Empty, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { useInterval } from 'usehooks-ts'
import { boardState } from '../../atoms/board.atom'
import { formattedGameSelector, gameState, updatePlayerNameAction } from '../../atoms/game.atom'
import { currentTurnSelector, historyState, playersScoreSelector } from '../../atoms/history'
import { addGameAction, globalScoreState } from '../../atoms/globalScore.atom'
import { SCControls } from './SCControls/SCControls'
import { SCPlayerCard } from './SCPlayerCard/SCPlayerCard'
import { SCHistory } from './SCHistory/SCHistory'
import { SCGameDetails } from './SCGameDetails/SCGameDetails'
import { SCHeading } from './SCHeader/SCHeader'

import styles from './SCContent.module.css'
import { getBoard, getGameEvents, saveGameState } from '../../services/client-api'

const SCContent = () => {
  const router = useRouter()
  const id = router?.query?.id as string
  const [board, setBoard] = useRecoilState(boardState)
  const [game, setGame] = useRecoilState(gameState)
  const formattedGame = useRecoilValue(formattedGameSelector)
  const currentTurn = useRecoilValue(currentTurnSelector)
  const playersScore = useRecoilValue(playersScoreSelector)
  const [globalScore, setGlobalScoreState] = useRecoilState(globalScoreState)
  const setHistory = useSetRecoilState(historyState)

  useInterval(async () => {
    if (!id) {
      return
    }

    const gameEvents = await getGameEvents(id)
    gameEvents.forEach((gameEvent) => {
      if (gameEvent.event === 'updatePlayer') {
        updatePlayerNameAction(setGame)(gameEvent.payload)
      }
      if (gameEvent.event === 'endGame') {
        setGame(null)
      }
      if (gameEvent.event === 'startGame') {
        addGameAction(setGlobalScoreState, setGame, setHistory)(gameEvent.payload as any)
      }
    })

    // we want all the atom updates to be completed before calling saveGameState
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })

    if (formattedGame) {
      saveGameState(formattedGame)
    }
  }, 1000)

  useEffect(() => {
    if (!id) {
      return
    }
    getBoard(id).then(setBoard)
  }, [id])

  return (
    <Content className={styles.content}>
      {!id && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="BOARD ID IS NOT DEFINED" />
        </div>
      )}
      {id && !board && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="Le tableau n'est pas connecté" />
        </div>
      )}
      {board && !game && (
        <div className={styles.contentCentered}>
          <Empty className={styles.centered} description="Aucune partie commencé" />
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
                  showGlobalScore={!!globalScore[0].score && !!globalScore[1].score}
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
          <SCControls />
        </>
      )}
    </Content>
  )
}

export default SCContent
