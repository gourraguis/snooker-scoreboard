/* eslint-disable @next/next/no-img-element */
import { FunctionComponent } from 'react'
import { Button } from 'antd'

import styles from './WSManager.module.css'

export const WSManager: FunctionComponent = () => (
  <div className={styles.all}>
    <div className={styles.wrapImg}>
      <img alt="Manager" src="/Manager.png" />
    </div>
    <div className={styles.wrapText}>
      <h2 className={styles.header}>Manager dashboard</h2>
      <div className={styles.wrapP}>
        <p className={styles.text}>Espace du serveur pour pouvoir lancer et manipuler les parties facilement.</p>
      </div>
      <div className={styles.buttonBos}>
        <Button href="https://manager.jawad.club/" className={styles.button} type="primary">
          Login
        </Button>
      </div>
    </div>
  </div>
)
