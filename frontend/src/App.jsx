import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Navigation from './Components/shared\'/Navigation/Navigation';
import "./App.css"
import Authenticate from './pages/authenticate/Authenticate';
import Activate from './pages/activate/Activate';
import Rooms from './pages/rooms/Rooms';
import { useSelector } from 'react-redux';

function App() {

    const {isAuth, user} = useSelector((state)=> state.auth ) 

   return (
      <BrowserRouter>
      <Navigation/>
      
         <Routes>

         {/*General Routes*/}


         {/*when the User first visit the site, he will be redirected to / path which will check if the user is logged in or not, if he is, he will be redirected to rooms routes */}



         <Route
              path="/"
              element={ !isAuth ? <Home/> : <Navigate to="/authenticate" />}
            />  
              <Route
              path="/authenticate"
              element={ !isAuth ? <Authenticate /> : <Navigate to="/activate" />}
            />

              
              {/*Semi protected Routes, user must be authorized to access the activate route*/}


             <Route
              path="/activate"
              element={ !isAuth ? 
               <Navigate to="/"></Navigate> :
               (isAuth && !user?.activated)? <Activate/> : <Navigate to="/rooms"></Navigate>
            
            }
            />



               {/*protected route, User must be authorized and activated in order to access the rooms */}
            

              <Route
              path="/rooms"
              element={ !isAuth ? 
               <Navigate to="/"></Navigate> :
               !isAuth && user.activated? <Rooms/> : <Navigate to="/activate"></Navigate>
            
            }
            />


         </Routes>
      </BrowserRouter>
   );
}

export default App;
