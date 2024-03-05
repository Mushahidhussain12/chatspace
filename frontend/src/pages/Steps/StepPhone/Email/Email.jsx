import React, { useState } from 'react'
import Card from '../../../../Components/shared\'/Card/Card'
import Button from '../../../../Components/shared\'/button/Button'
import Textinput from '../../../../Components/shared\'/input/Textinput'
import styles from "../StepPhone.module.css"



const Email = ({onclick}) => {
  const[number,setnumber] = useState('');
  return (
    <Card title="Enter your Email address" icon="email">

<Textinput value={number} onChange={(e)=> setnumber(e.target.value) } ></Textinput>

     
    {/*everything written here will be passed as children prop in the component */}


    <div className={styles.Singlebutton}>
     <Button onclick={onclick} text="Next"></Button>
      </div>

      <p className={styles.paragraph}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ab voluptatem.
      </p>
     

 
 </Card>
  )
}

export default Email;