import React from 'react'
import DashboardPage from './DashboardPage'
import { Route } from 'lucide-react'



function App() {
  return (
    <div>
      <DashboardPage />
     <Route path="/dashboard" element={<DashboardPage />} />
    </div>
  )
}

export default App