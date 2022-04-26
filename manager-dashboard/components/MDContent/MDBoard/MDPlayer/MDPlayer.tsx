import { Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'
import debounce from 'debounce'
import { IPlayer } from '../../../../types/player'

import styles from './MDPlayer.module.css'
import { playersNamesState } from '../../../../atoms/playersNames.atom'
import { createGameEvent } from '../../../../services/manager-api'

const { Paragraph } = Typography

const createGameEventDebounce = debounce(createGameEvent, 1500)

interface MDPlayerProps {
  player: IPlayer
  boardId: string
}

export const MDPlayer: FunctionComponent<MDPlayerProps> = ({ player, boardId }) => {
  const [playersNames, setPlayersNames] = useRecoilState(playersNamesState)

  const updateName = (event: any) => {
    if (player.turn === 0) {
      setPlayersNames([event.target.value, playersNames[1]])
    }
    if (player.turn === 1) {
      setPlayersNames([playersNames[0], event.target.value])
    }

    const field = player.turn === 0 ? 'firstPlayer' : 'secondPlayer'
    createGameEventDebounce(boardId, {
      event: 'updatePlayer',
      payload: {
        [field]: event.target.value,
      },
    })
  }

  // useEffect(() => {
  //   setName(player.name)
  // }, [player])

  // const updateName = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const field = player.turn === 0 ? 'firstPlayer' : 'secondPlayer'

  //   setGame((prevGame) => {
  //     if (!prevGame) {
  //       return null
  //     }
  //     return {
  //       ...prevGame,
  //       players: [
  //         {
  //           ...prevGame.players[0],
  //           name: player.turn === 0 ? name : prevGame.players[0].name,
  //         },
  //         {
  //           ...prevGame.players[1],
  //           name: player.turn === 1 ? name : prevGame.players[1].name,
  //         },
  //       ],
  //     }
  //   })

  //   emitUpdatePlayerName({
  //     boardId,
  //     [field]: name,
  //   })
  // }

  return (
    <Space direction="vertical">
      <form onSubmit={updateName}>
        <input className={styles.name} value={playersNames[player.turn]} onChange={updateName} />
      </form>
      <UserOutlined className={styles[`icon${player.turn}`]} />
      <Paragraph keyboard className={styles.score}>
        {player.score}
      </Paragraph>
    </Space>
  )
}
