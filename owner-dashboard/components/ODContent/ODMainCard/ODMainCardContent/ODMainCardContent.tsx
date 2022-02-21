import { EllipsisOutlined } from '@ant-design/icons'
import { Row, Col, Divider, Card, Dropdown, Menu } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { managersStats, tablesStats } from '../../../../atoms/mainStats'
import { deleteManager, deleteTable } from '../../../../services/owner-api'
import { ICardElements } from '../../../../types/cardElement'

import styles from './ODMainCardContent.module.css'

export const ODMainCardContent: FunctionComponent<ICardElements> = ({ id, name, dailyScore, weeklyScore }) => {
  const [managersElements, setManagersElements] = useRecoilState(managersStats)
  const [tablesElements, setTablesElements] = useRecoilState(tablesStats)

  const isPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return false
    }
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const deleteElem = (id: string) => {
    if (isPhoneNumber(id)) deleteManager(managersElements, id, setManagersElements)
    else deleteTable(tablesElements, id, setTablesElements)
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
