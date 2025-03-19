import React from 'react';

import Navbar from './component/Navbar';
import About from './component/About';
import { BrowserRouter as Router,
   Routes, 
   Route 

} from 'react-router-dom';

import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/home' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
            
          
        </Routes>
        
      </Router>
      



    </>
  );
};

export default App;

