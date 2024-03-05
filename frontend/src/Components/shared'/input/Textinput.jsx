import React, { useRef } from 'react'
import styles from './Textinput.module.css'


const input = ({handleChange}) => {
  return (
    <div>
    <input onChange={handleChange} className={styles.input} type="text" />
    </div>
  )
}

export default input