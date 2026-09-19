import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        // nothing to clear yet since we're not storing a token, but
        // we'll hook this up properly when auth state management is added
        navigate('/')
    }

    return (
        <nav className="bg-white border-b px-8 py-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
                SupportDesk
            </span>

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

                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Log Out
                </button>
            </div>
        </nav>
    )
}

export default Navbar