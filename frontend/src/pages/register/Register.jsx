import React, { useState } from 'react'
import styles from "./Registor.module.css"
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
import StepName from '../Steps/stepName/StepName'
import StepOtp from '../Steps/stepOtp/StepOtp';
import StepPhone from '../Steps/StepPhone/StepPhone';
import StepUsername from '../Steps/StepUsername/StepUsername';


//created a object to change components dynamically.

const steps = {
    1:StepPhone,
    2:StepOtp,
    3:StepName,
    4:StepName,
    5:StepUsername
}


const Register = () => {

   const [step,nextStep] = useState(1);

   function onclick(){
    nextStep(step+1);
   }

   const Currentstep = steps[step]

  return (
    <Currentstep onclick={onclick} ></Currentstep>
  )
}

export default Register