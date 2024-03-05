import React, { useState } from 'react';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import styles from './StepPhone.module.css';

const StepPhone = ({ onclick }) => {
  const steps = {
    Email: Email,
    Phone: Phone
  };


  const [selected, setSelected] = useState('Email');

  const Selected = steps[selected];

  return (
    <>
    <div className={styles.wrapper}>
      <div>
     <div className={styles.buttons}>
      <button className={`${styles.button}
      ${selected == "Email"? styles.active : ""}`} onClick={() => {
        setSelected('Email');
      }}><img src='/images/email.png'/></button>
        <button className={`${styles.button}
      ${selected == "Phone"? styles.active : ""}`} onClick={() => {
        setSelected('Phone');
      }}><img src='/images/telephone.png'/></button>
      </div>
      <Selected onclick={onclick}></Selected>
      </div>
      </div>
    </>
  );
}

export default StepPhone;
