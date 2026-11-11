import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Deepankar from './Deepankar';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Deepankar />} />
       <Route path="/dashboard" element={<Deepankar />} />
      
  
     </Routes> 
   
   
  );
}

export default App;
