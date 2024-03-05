import React, { useState } from 'react'
import StepPhone from '../Steps/StepPhone/StepPhone'
import StepOtp from '../Steps/stepOtp/StepOtp'

const steps = {
    1:StepPhone,
    2:StepOtp
}

const Login = () => {

    const [step,nextStep] = useState(1);

    function onclick(){
     nextStep(step+1);
    }
 
    

    const Currentstep = steps[step]
 

  return (
    <Currentstep onclick={onclick}></Currentstep>
  )
}

export default Login