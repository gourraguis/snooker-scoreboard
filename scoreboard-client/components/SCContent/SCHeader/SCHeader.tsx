import { FunctionComponent } from 'react'
import styles from './SCHeader.module.css'

interface SCHeadingProps {
  title: string
}

const SCHeading: FunctionComponent<SCHeadingProps> = ({ title }) => (
  <div className={styles.content}>
    <h3 className={styles.title}>{title}</h3>
  </div>
)

export default SCHeading
