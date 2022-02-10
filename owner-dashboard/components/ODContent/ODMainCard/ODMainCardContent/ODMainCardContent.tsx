import { EllipsisOutlined } from '@ant-design/icons'
import { Row, Col, Divider, Card, Dropdown, Menu } from 'antd'
import { FunctionComponent } from 'react'
import { ICardElements } from '../../../../types/cardElement'

import styles from './ODMainCardContent.module.css'

export const ODMainCardContent: FunctionComponent<ICardElements> = ({ id, name, dailyScore, weeklyScore }) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const deleteElem = (id: string) => {
    console.log(id)
  }

  const menu = (
    <Menu>
      <Menu.Item key="delete" onClick={() => deleteElem(id)}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <Card className={styles.card} bodyStyle={{ paddingTop: '18px' }}>
      <Row className={styles.ellips}>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined key="ellipsis" />
          </a>
        </Dropdown>
      </Row>
      <Row>
        <Col span={6} className={styles.column}>
          <h3 className={styles.name}>{name}</h3>
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.dailyScore}>{dailyScore} </span>
          <span className={styles.text}>Matches Ce Jour</span>
        </Col>

        <Col span={2}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.weeklyScore}>{weeklyScore} </span>
          <span className={styles.text}>Matches Cette Semaine</span>
        </Col>
      </Row>
    </Card>
  )
}
