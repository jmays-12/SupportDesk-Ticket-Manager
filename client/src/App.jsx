import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Customers from './pages/Customers'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/customers" element={<Customers />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

