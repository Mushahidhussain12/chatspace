import React, { useRef, useState } from 'react'
import Card from '../../../../Components/shared\'/Card/Card'
import Button from '../../../../Components/shared\'/button/Button'
import Textinput from '../../../../Components/shared\'/input/Textinput'
import styles from "../StepPhone.module.css"
import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice'
const Phone = ({onclick}) => {
  const number = useRef(null);

 
    const handleChange = (e) => {
      number.current = e.target.value;
  };




  const dispatch = useDispatch();

  async function ServerRequest(){
    if(number.current){
    const response = await fetch("/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         phone:number.current,
      }),
    });
    const data = await response.json();
    dispatch(setOtp({
      phone: data.phone, hash:data.hash
    }))

    console.log(data);

    onclick();
  }else{
    return;
  }
  }
 


  return (
    <Card title="Enter your Phone number" icon="telephone">
      <Textinput  handleChange = {handleChange} ></Textinput>
      

     
    {/*everything written here will be passed as children prop in the component */}


      <div className={styles.Singlebutton}>
     <Button onclick={ServerRequest} text="Next"></Button>
      </div>

      <p className={styles.paragraph}>
      By clicking Next, you agree to our terms and conditions.
      </p>
     

 
 </Card>
  )
}

export default Phone