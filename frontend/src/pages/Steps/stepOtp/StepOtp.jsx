import React, { useRef, useState } from 'react'
import Textinput from '../../../Components/shared\'/input/Textinput'
import styles from "./Stepotp.module.css"
import Card from '../../../Components/shared\'/Card/Card';
import Button from '../../../Components/shared\'/button/Button'
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';


const StepOtp = ({onclick}) => {

  const dataStore = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  console.log(dataStore);

  const number = useRef(null);

 
  const handleChange = (e) => {
    number.current = e.target.value;
};



  async function ServerRequest(){
    if(number.current){
    const response = await fetch("/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         phone:dataStore.otp.phone,
         hash:dataStore.otp.hash,
         otp:number.current
      }),
    });
    const data = await response.json();

    dispatch(setAuth(data));
  }else{
    return;
  }
}

  return (
    <div className={styles.wrapper}>
      <Card title="Enter The OTP" icon="otp">
  
      <Textinput  handleChange = {handleChange} ></Textinput>
  
       
      {/*everything written here will be passed as children prop in the component */}
  
  
      <div className={styles.Singlebutton}>
       <Button onclick={ServerRequest} text="Verify OTP"></Button>
        </div>
  
        <p className={styles.paragraph}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ab voluptatem.
        </p>
       
  
   
   </Card>
   </div>
  )
}

export default StepOtp