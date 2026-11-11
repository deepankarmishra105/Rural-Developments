import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Deepankar from "./Deepankar";
import Government from "./Government File/Government";
import JobsSkills from "./job and skill/Jobsskills";
import Student from "./Student";
import Farmer from "./Farmer corner/Farmer";


         // change file name

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Deepankar />} />
      <Route path="/schemes" element={<Government />} />
      <Route path="/student" element={<Student />} />
      <Route path="/jobs" element={<JobsSkills />} />
      <Route path="/farmer" element={<Farmer />} />
 
    
    
 
    </Routes>
  </BrowserRouter>
);