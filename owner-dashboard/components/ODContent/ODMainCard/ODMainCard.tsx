import { Button, Card, Tooltip } from 'antd'
import { FunctionComponent, useState } from 'react'
import { ICardElements } from '../../../types/cardElement'
import { ODMainCardContent } from './ODMainCardContent/ODMainCardContent'

import styles from './ODMainCard.module.css'
import ODTableForm from './ODModals/ODTableModal'
import ODManagerModal from './ODModals/ODManagerModal'

interface ODMainCardProps {
  id: string
  title: string
  elements: ICardElements[]
}
const ODMainCard: FunctionComponent<ODMainCardProps> = ({ id, title, elements }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <Card
      title={title}
      extra={
        <Tooltip title={`Add ${title}`}>
          <Button onClick={showModal} shape="circle">
            +
          </Button>
        </Tooltip>
      }
      className={styles.card}
    >
      {elements.map((elem) => (
        <ODMainCardContent
          key={elem.name}
          id={elem.id}
          name={elem.name}
          dailyScore={elem.dailyScore}
          weeklyScore={elem.weeklyScore}
        />
      ))}
      {id === 'table' && (
        <div>{isModalVisible && <ODTableForm onCancel={handleCancel} visible={isModalVisible} />}</div>
      )}
      {id === 'manager' && (
        <div>{isModalVisible && <ODManagerModal onCancel={handleCancel} visible={isModalVisible} />}</div>
      )}
    </Card>
  )
}

export default ODMainCard
