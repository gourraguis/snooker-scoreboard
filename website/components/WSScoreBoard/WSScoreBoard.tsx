/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react'

import styles from './WSScoreBoard.module.css'

export const WSScoreBoard: FunctionComponent = () => (
  <div className={styles.all}>
    <div className={styles.bgWrap}>
      <img alt="Bg" src="/Bg.jpeg" />
    </div>
    <div className={styles.bgText}>
      <p className={styles.test}>
        La meilleur solution pour optimiser
        <br />
        les revenus de votre salle
      </p>
    </div>
  </div>
)
