import React from 'react';
import styles from './Card.module.css'

const Card = ({title,icon,children}) => {
  return (
    <div className={styles.main}>
    <div className={styles.card}>
      <div className={styles.heading}>
        <img  style={{width:"60px", height:"60px", marginBottom:"10px"}} src={`/images/${icon}.png`} alt="logo"/>
        <h1 style={{fontWeight:"bold"}}>{title}</h1>
      </div>
      {/* <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa vel quia culpa dicta vitae numquam, est in rerum architecto! Necessitatibus saepe facilis quis magni mollitia consequuntur laboriosam, hic rem magnam!</p>
      <div>
        <button>
          <span>Get your username</span>
          <img src="/images/arrow-forward.png" alt="arrow" />
        </button>
      </div>
      <div>
        <span>Have an invite text</span>
        <Link to='/login'>
          sign in
        </Link>
      </div>
     */}
     {children}
     </div>
    </div>
  )
}

export default Card;