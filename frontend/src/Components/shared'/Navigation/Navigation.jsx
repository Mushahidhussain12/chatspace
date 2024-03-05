import React from 'react'
import {Link} from 'react-router-dom'; 
import styles from './Navigation.module.css'

{/* used to avoid page reloading */}

const Navigation = () => {
  return (
  <nav className={`${styles.navbar} container`}>

    {/*since the module styling does not apply to children elements thats why we are defining its styling seperately */}

    <Link style={{textDecoration:"none",color:"white",fontWeight:"bold",fontSize:"22px",display:"flex",alignItems:"center",
    gap:"10px",
    justifyContent:"center"
    
}} to="/">
        <img style={{marginLeft:"10px",
        width:"60px",
        height:"60px"
         
    }} src="/images/space.png" alt='logo'></img>
        <span>Cosmic Chat</span>
    </Link>
  </nav>
  )
}

export default Navigation