import { EllipsisOutlined } from '@ant-design/icons'
import { Row, Col, Divider, Card, Dropdown, Menu } from 'antd'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import { ownerManagersState } from '../../../../atoms/managers.atom'
import { deleteManager } from '../../../../services/api'
import { ICardElements } from '../../../../types/cardElement'

import styles from './ODMainCardContent.module.css'

export const ODMainCardContent: FunctionComponent<ICardElements> = ({ id, name, dailyGames, weeklyGames }) => {
  const [ownerManagers, setOwnerManagers] = useRecoilState(ownerManagersState)

  const isPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return false
    }
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const deleteElem = (id: string) => {
    // todo: replace this with a clearer code, aka separate functions for manager and board
    if (isPhoneNumber(id)) {
      deleteManager(id)
      setOwnerManagers(ownerManagers.filter((element) => element.id !== id))
    }
    // we disabled deleting boards per said request, if it stays disabled for a few months delete it from the code
    // deleteBoard(id)
    // setOwnerBoards(ownerBoards.filter((element) => element.id !== id))
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
        {isPhoneNumber(id) && (
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined key="ellipsis" />
            </a>
          </Dropdown>
        )}
      </Row>
      <Row>
        <Col span={8} className={styles.column}>
          <h3 className={styles.name}>{name}</h3>
        </Col>

        <Col span={1}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.dailyGames}>{dailyGames}</span>
          <span className={styles.text}>Jour</span>
        </Col>

        <Col span={1}>
          <Divider type="vertical" className={styles.divider} />
        </Col>

        <Col span={7} className={styles.column}>
          <span className={styles.weeklyGames}>{weeklyGames}</span>
          <span className={styles.text}>Semaine</span>
        </Col>
      </Row>
    </Card>
  )
}
