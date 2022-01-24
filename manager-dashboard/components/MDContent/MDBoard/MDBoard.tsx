import { Card, Row, Col, Divider } from 'antd'
import { PlusOutlined, HistoryOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { IBoard } from '../../../types/board'
import { MDTimer } from './MDTimer/MDTimer'

import styles from './MDBoard.module.css'
import { emitNewGame } from '../../../services/socket'
import { MDPlayer } from './MDPlayer/MDPlayer'

interface MDBoardProps {
  board: IBoard
}

export const MDBoard: FunctionComponent<MDBoardProps> = ({ board }) => {
  const handleNewGame = () => {
    console.log(`starting new game on board: ${board.name}`)
    emitNewGame(board.id)
  }

  const handleHistory = () => {
    console.log(`show history on board: ${board.name}`)
  }

  return (
    <Card
      title={board.name}
      extra={<MDTimer startedAt={board.startedAt} />}
      actions={[
        <PlusOutlined onClick={handleNewGame} key="newGame" />,
        <HistoryOutlined onClick={handleHistory} key="history" />,
      ]}
      className={styles.card}
    >
      <Row>
        <Col span={11} className={styles.column}>
          <MDPlayer player={board.players[0]} />
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={11} className={styles.column}>
          <MDPlayer player={board.players[1]} />
        </Col>
      </Row>
    </Card>
  )
}
