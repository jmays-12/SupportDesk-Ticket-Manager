import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Customers from './pages/Customers'
import Auth from './pages/Auth'

// redirect if user is not logged in
function ProtectedRoute({ currentUser, children }) {
    if (!currentUser) {
        return <Navigate to="/" replace state={{ message: "You need to log in to access that page." }} />
    }
    return children
}

function App() {
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = localStorage.getItem('currentUser')
        return stored ? JSON.parse(stored) : null
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth setCurrentUser={setCurrentUser} />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute currentUser={currentUser}>
                            <Dashboard currentUser={currentUser} onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/customers" element={<Customers />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
