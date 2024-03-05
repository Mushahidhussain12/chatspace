import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     name:'',
     avatar:'',
     isAuth : false,
     user : null,
     otp:{
      phone:'',
      hash:''
     }
     
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {  
      const {user} = action.payload;
      state.user = user;
      state.isAuth = true;
    },

    setName:(state,action)=>{
   const name = action.payload;
   state.name = name;
    },

    
    setAvatar:(state,action)=>{
      const avatar = action.payload;
      state.avatar = avatar;
       },


    setOtp:(state,action)=>{
    const {phone,hash} = action.payload;
    
    state.otp.phone = phone;
    state.otp.hash = hash;

    

    }
  },
})
 
export const { setAuth,setOtp,setAvatar,setName } = authSlice.actions

export default authSlice.reducer