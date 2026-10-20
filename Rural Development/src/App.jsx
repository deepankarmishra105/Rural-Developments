import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Deepankar from './Deepankar';

export default function App() {
  return (
   
      <Routes>
     
        <Route path="/" element={<Deepankar />} />
        
      </Routes>
   
  );
}