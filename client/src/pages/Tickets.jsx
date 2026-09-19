import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'


// priority and status have colors to make them easier to scan at a glance 
const statusStyles = {
    open: 'bg-blue-50 text-blue-700 border-blue-200',
    in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    resolved: 'bg-green-50 text-green-700 border-green-200',
}

const priorityStyles = {
    low: 'bg-gray-50 text-gray-600 border-gray-200',
    medium: 'bg-orange-50 text-orange-700 border-orange-200',
    high: 'bg-red-50 text-red-700 border-red-200',
    critical: 'bg-red-100 text-red-900 border-red-400',
}

function Tickets() {
    document.title = 'SupportDesk - Tickets'

    const [tickets, setTickets] = useState([])
    const [customers, setCustomers] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:5000/api/tickets').then((r) => r.json()),
            fetch('http://localhost:5000/api/customers').then((r) => r.json()),
            fetch('http://localhost:5000/api/users').then((r) => r.json()),
        ])
            .then(([ticketsData, customersData, usersData]) => {
                setTickets(ticketsData)
                setCustomers(customersData)
                setUsers(usersData)
                setLoading(false)
            })
            .catch(() => {
                setMessage('Failed to load data.')
                setLoading(false)
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="mx-auto max-w-6xl p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
                        <p className="mt-2 text-gray-600">View and manage support tickets.</p>
                    </div>

                    <button
                        type="button"
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        New Ticket
                    </button>
                </div>

                {message && (
                    <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                        {message}
                    </div>
                )}

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    {loading ? (
                        <p className="text-gray-500">Loading tickets...</p>
                    ) : tickets.length === 0 ? (
                        <p className="text-gray-500">No tickets yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {tickets.map((ticket) => (
                                <div key={ticket.id} className="rounded border p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="font-semibold text-gray-900">
                                                {ticket.subject}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-600">
                                                {ticket.description}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Customer: {ticket.customer_name}
                                            </p>

                                            {ticket.assigned_user_name && (
                                                <p className="text-sm text-gray-500">
                                                    Assigned to: {ticket.assigned_user_name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex shrink-0 flex-col items-end gap-2">
                                            <span className={`rounded border px-2 py-1 text-xs ${statusStyles[ticket.status]}`}>
                                                {ticket.status.replace('_', ' ')}
                                            </span>

                                            <span className={`rounded border px-2 py-1 text-xs ${priorityStyles[ticket.priority]}`}>
                                                {ticket.priority}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Tickets