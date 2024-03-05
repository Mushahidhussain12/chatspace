import React, { useRef } from 'react'
import Button from '../../../Components/shared\'/button/Button'
import Card from '../../../Components/shared\'/Card/Card';
import Styles from './StepName.module.css';
import Textinput from '../../../Components/shared\'/input/Textinput'
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/authSlice';



const StepName = ({onclick}) => {

  const dataStore = useSelector((state) => state.auth);
  const number = useRef(dataStore.name);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    number.current = e.target.value;
};

  function clickHandler(){

  if(!number.current){
  return;
  }else{
  dispatch(setName(number.current));
  onclick();
  }
  }

 
  return (
    <div className={Styles.main}>
   <Card title="Enter Your Good Name" icon="space">

   <Textinput  handleChange = {handleChange} ></Textinput>
  
       
  {/*everything written here will be passed as children prop in the component */}

  <p className={Styles.paragraph}>
    This name will serve as your username, which will be visible to all other users
    </p>


  <div className={Styles.Singlebutton}>
   <Button text="Next" onclick={clickHandler} ></Button>
    </div>

   </Card>

    


   </div>
  )
}

export default StepName;