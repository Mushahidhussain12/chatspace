import React, { useState } from 'react'
import StepName from '../Steps/stepName/StepName';
import StepAvatar from '../Steps/StepAvatar/StepAvatar';


const steps = {
  1: StepName,
  2: StepAvatar
}

const Activate = () => {

  
 
   const[step,setStep] = useState(1);

   
  function onClick(){
    setStep(step + 1);
  }

  const Currentstep = steps[step]

  return (
<Currentstep onclick={onClick} ></Currentstep>
  )
}

export default Activate