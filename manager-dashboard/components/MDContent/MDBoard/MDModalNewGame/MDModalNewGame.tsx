import React, { FunctionComponent, useState } from 'react'
import { Button, Modal, Space, Tooltip } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'
import { openNotification } from '../../../../services/notification'
import styles from './MDModalNewGame.module.css'
import { waitlistState } from '../../../../atoms/waitlist.atom'

interface MDModalNewGameProps {
  previousPlayers?: string[]
  onCancel: () => void
  onSubmit: (firstPlayer: string, secondPlayer: string) => void
}

const MDModalNewGame: FunctionComponent<MDModalNewGameProps> = ({ previousPlayers, onCancel, onSubmit }) => {
  const [waitlist, setWaitlist] = useRecoilState(waitlistState)
  const [firstPlayerName, setFirstPlayerName] = useState(previousPlayers ? previousPlayers[0] : 'Joueur 1')
  const [secondPlayerName, setSecondPlayerName] = useState(previousPlayers ? previousPlayers[1] : 'Joueur 2')

  const useWaitlist = (position: 0 | 1) => () => {
    if (!waitlist?.length) {
      openNotification({
        title: `Makayen ta joueur fla liste d'attente`,
        type: 'warning',
      })
      return
    }

    if (position === 0) {
      setFirstPlayerName(waitlist[0])
    }
    if (position === 1) {
      setSecondPlayerName(waitlist[0])
    }

    setWaitlist((previousWaitList) => {
      const newList = previousWaitList.slice(1)
      localStorage.setItem('waitlist', JSON.stringify(newList))
      return newList
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(firstPlayerName, secondPlayerName)
  }

  return (
    <div>
      <Modal
        title="Nouvelle Partie"
        visible
        onCancel={onCancel}
        footer={[
          <Button onClick={handleSubmit} key="submit" htmlType="submit" type="primary">
            Commencer la partie
          </Button>,
        ]}
      >
        <form>
          <Space className={styles.space}>
            <input
              name="firstPlayer"
              id="firstPlayer"
              style={{ width: 260 }}
              value={firstPlayerName}
              onChange={(e) => setFirstPlayerName(e.target.value)}
            />
            <Tooltip title="Take player from waiting list">
              <FileTextOutlined onClick={useWaitlist(0)} className={styles.icon} />
            </Tooltip>
          </Space>
          <Space className={styles.space}>
            <input
              name="secondPlayer"
              id="secondPlayer"
              style={{ width: 260 }}
              value={secondPlayerName}
              onChange={(e) => setSecondPlayerName(e.target.value)}
            />
            <Tooltip title="Take player from waiting list">
              <FileTextOutlined onClick={useWaitlist(1)} className={styles.icon} />
            </Tooltip>
          </Space>
        </form>
      </Modal>
    </div>
  )
}

export default MDModalNewGame
