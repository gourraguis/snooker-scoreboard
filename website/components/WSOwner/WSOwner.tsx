/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react'
import { Button } from 'antd'

import styles from './WSOwner.module.css'

export const WSOwner: FunctionComponent = () => (
  <div className={styles.all}>
    <div className={styles.wrapText}>
      <h2 className={styles.header}>Owner dashboard</h2>
      <div className={styles.wrapP}>
        <p className={styles.text}>
          Espace du propriétaire pour pouvoir gérer ces tables et serveurs facilement et voir les statistiques en temps
          réelle.
        </p>
      </div>
      <div className={styles.buttonBos}>
        <Button className={styles.button} type="primary">
          Login
        </Button>
      </div>
    </div>
    <div className={styles.wrapImg}>
      <img alt="Owner" src="/Owner.png" />
    </div>
  </div>
)
