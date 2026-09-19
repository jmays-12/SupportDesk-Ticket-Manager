import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar.jsx'
import { apiFetch } from '../api.js'

function Dashboard({ currentUser, onLogout }) {
    document.title = 'SupportDesk - Dashboard'

    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiFetch('/api/tickets')
            .then(async (response) => {
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.msg || data.error || 'Failed to load tickets')
                }

                setTickets(Array.isArray(data) ? data : [])
            })
            .catch((error) => {
                console.error('Failed to load dashboard tickets:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const openTickets = tickets.filter(
        (ticket) => ticket.status !== 'closed'
    ).length

    const closedTickets = tickets.filter(
        (ticket) => ticket.status === 'closed'
    ).length

    const criticalPriorityTickets = tickets.filter(
        (ticket) => ticket.priority === 'critical'
    ).length

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar currentUser={currentUser} onLogout={onLogout} />

            <div className="mx-auto max-w-6xl px-4 pt-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome, {currentUser?.name || 'User'}
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Here's an overview of your support desk.
                    </p>
                </div>

                {/* stats */}
                <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm font-medium text-gray-500">
                            Open Tickets
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {loading ? '-' : openTickets}
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm font-medium text-gray-500">
                            Critical Priority
                        </p>

                        <p className="mt-2 text-3xl font-bold text-red-600">
                            {loading ? '-' : criticalPriorityTickets}
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <p className="text-sm font-medium text-gray-500">
                            Closed Tickets
                        </p>

                        <p className="mt-2 text-3xl font-bold text-green-600">
                            {loading ? '-' : closedTickets}
                        </p>
                    </div>
                </div>

                {/* quick actions */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Quick Actions
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                            to="/tickets"
                            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            View Tickets
                        </Link>

                        <Link
                            to="/tickets"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Manage Tickets
                        </Link>
                    </div>
                </div>

                {/* recent tickets */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Recent Tickets
                        </h2>

                        <Link
                            to="/tickets"
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            View all
                        </Link>
                    </div>

                    {loading ? (
                        <p className="mt-4 text-gray-500">
                            Loading tickets...
                        </p>
                    ) : tickets.length === 0 ? (
                        <p className="mt-4 text-gray-500">
                            No tickets yet.
                        </p>
                    ) : (
                        <div className="mt-4 divide-y divide-gray-200">
                            {tickets.slice(-5).reverse().map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex items-center justify-between py-4"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {ticket.subject}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {ticket.customer_name || 'Unknown customer'}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                        {ticket.status.replace('_', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
