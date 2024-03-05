import React, { useRef, useState } from 'react'
import Button from '../../../Components/shared\'/button/Button'
import Card from '../../../Components/shared\'/Card/Card';
import Styles from './StepAvatar.module.css';
import Textinput from '../../../Components/shared\'/input/Textinput'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { setAvatar } from '../../../store/authSlice';


const StepAvatar = ({onclick}) => {
  const dataStore = useSelector((state) => state.auth);
  const[image,SetImage] = useState('/images/hello.png')
  const number = useRef(dataStore.name);

  const dispatch = useDispatch();


  const handleImage = (e) => {
    const file = e.target.files[0];

    //checking, if the file exist and what is it type, must be an image.

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
 
        //converting file into base64 string.

        // Base64 is a way of transforming any data into a gibberish of digits and letters

        reader.onloadend = () => {
            SetImage(reader.result);
            dispatch(setAvatar(reader.result));
        };
        reader.readAsDataURL(file);
        
    }else{
      return;
    } 
  }

  async function ServerRequest(){
    if(dataStore.avatar){
    const response = await fetch("/api/activate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         name: dataStore.name,
         avatar: dataStore.avatar
      }),
    });
    const data = await response.json();

    if(data.auth){
      dispatch(setAuth(data));
    }
  }else{
    return;
  }
}

  return (
    <div className={Styles.main}>
   <Card title={`Welcome, ${dataStore.name}   !`} icon="hello">
    <p className={Styles.sub}>How About This Photo?</p>
    <div className={Styles.avatar}>
  <img className={Styles.avatarImg} src={image} alt="" />
    </div>

    <input id='input' className={Styles.input}  onChange={handleImage} type="file" />




  
       
  {/*everything written here will be passed as children prop in the component */}


  {/*Vertical margin do not work for inline elements! */}

<label For="input">  <p className={Styles.paragraph}>
   Choose a different photo
    </p>
    </label>


  <div className={Styles.Singlebutton}>
   <Button onclick={ServerRequest}  text="Next" ></Button>
    </div>

   </Card>

    


   </div> 
  )
}

export default StepAvatar;