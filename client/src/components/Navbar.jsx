import { NavLink, useNavigate, useLocation } from 'react-router-dom'

function Navbar({ currentUser, onLogout }) {
    const navigate = useNavigate()
    const location = useLocation()

    // pick up the "not logged in" message if we were redirected here
    const redirectMessage = location.state?.message

    const handleLogout = () => {
        onLogout()
        navigate('/')
    }

    return (
        <>
            {redirectMessage && (
                <div className="bg-yellow-50 border-b border-yellow-200 px-8 py-2 text-sm text-yellow-800 text-center">
                    {redirectMessage}
                </div>
            )}

            <nav className="bg-white border-b px-8 py-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">SupportDesk</span>

                <div className="flex items-center gap-6">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-sm font-medium text-blue-600'
                                : 'text-sm text-gray-600 hover:text-gray-900'
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/tickets"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-sm font-medium text-blue-600'
                                : 'text-sm text-gray-600 hover:text-gray-900'
                        }
                    >
                        Tickets
                    </NavLink>

                    <NavLink
                        to="/customers"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-sm font-medium text-blue-600'
                                : 'text-sm text-gray-600 hover:text-gray-900'
                        }
                    >
                        Customers
                    </NavLink>

                    <div className="flex items-center gap-3 border-l pl-6">
                        {currentUser && (
                            <span className="text-sm text-gray-500">
                                {currentUser.name}
                            </span>
                        )}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar