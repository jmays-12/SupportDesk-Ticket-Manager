import Navbar from '../components/Navbar.jsx'

function Dashboard({ currentUser, onLogout }) {
    document.title = "SupportDesk - Dashboard"
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar currentUser={currentUser} onLogout={onLogout} />
            <div className="mx-auto max-w-6xl pt-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">
                        Dashboard content placeholder.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
