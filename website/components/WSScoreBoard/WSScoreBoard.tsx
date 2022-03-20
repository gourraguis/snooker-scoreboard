/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react'

import styles from './WSScoreBoard.module.css'

export const WSScoreBoard: FunctionComponent = () => (
  <div className={styles.all}>
    <h2 className={styles.header}>Score Board</h2>
    <p className={styles.text}>Tableau pour afficher et gérer les résultats.</p>
    <div className={styles.bgWrap}>
      <img alt="ScoreBoard" src="/ScoreBoard.png" />
    </div>
  </div>
)
