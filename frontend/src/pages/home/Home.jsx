import React from 'react'
import Card from '../../Components/shared\'/Card/Card'
import { Link, useNavigate } from "react-router-dom";
import styles from './Home.module.css'
import Button from '../../Components/shared\'/button/Button'
import sample from '/MERNSTACKPROGRAMS/chatspace/frontend/public/images/pexels.mp4';



const Home = () => {
   
   const navigate = useNavigate();
   
   function clickHandler(){
         navigate("/authenticate");
   }

  return (


  <div className={styles.main}>

  <Card title="Welcome to Space!" icon="space">

     
     {/*everything written here will be passed as children prop in the component */}


     <p className={styles.paragraph}>Unmute Your Thoughts: Where Voices Meet in the Space</p>
       <div>
      <Button onclick={clickHandler} text="Enter the Space"></Button>
       </div>
       <div className={styles.invite}>
         <span>Have an invite text</span>
         <Link style={{color:"0077ff", textDecoration:"none" , marginLeft:"10px",
        fontWeight:"bold"}} to='/Login'>
           sign in
         </Link>
       </div>

  
  </Card>
  </div>

    
  )
}

    

export default Home;