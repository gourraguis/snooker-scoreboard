import React, { FunctionComponent } from 'react'
import { Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { ITurn } from '../../../../types/turn'
import { getBallColor } from '../../../../utils/balls'

import styles from './MDModalHistory.module.css'

interface MDModalHistoryProps {
  onCancel: () => void
  visible: boolean
  name: string
  history: ITurn[]
}

const MDModalHistory: FunctionComponent<MDModalHistoryProps> = ({ onCancel, visible, name, history }) => {
  const handleCancel = () => {
    onCancel()
  }

  return (
    <div>
      <Modal title={`History for ${name}`} visible={visible} onCancel={handleCancel} footer={null}>
        {history?.map((item, index) => (
          <div key={index} className={styles.wrapper}>
            <UserOutlined className={styles[`icon${item.value}`]} />
            <div>
              <h3 className={styles.text}>Marque {item.scoredBalls.reduce((a, b) => a + b, 0)} points</h3>
              <div className={styles.ballBox}>
                {item.scoredBalls.map((ball, index2) => (
                  <div
                    key={index2}
                    style={{
                      backgroundColor: getBallColor(ball),
                    }}
                    className={styles.ball}
                  >
                    {}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  )
}

export default MDModalHistory
