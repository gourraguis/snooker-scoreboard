/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react'

import styles from './WSMainSection.module.css'

export const WSMainSection: FunctionComponent = () => (
  <div className={styles.all}>
    <div className={styles.bgWrap}>
      <img alt="Bg" src="/Bg.jpeg" />
    </div>
    <div className={styles.bgText}>
      <p>
        La meilleur solution pour optimiser
        <br />
        les revenus de votre salle
      </p>
    </div>
  </div>
)
