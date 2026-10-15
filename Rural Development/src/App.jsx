import React from 'react'
import Deepankar from './Deepankar'
import { Route } from 'lucide-react'



function App() {
  return (
    <div>
      <Deepankar/>
      
     <Route path="/dashboard" element={<Deepankar />} />
    </div>
  )
}

export default App