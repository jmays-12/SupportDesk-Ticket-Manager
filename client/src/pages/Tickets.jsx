import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

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

    // new ticket form state
    const [showForm, setShowForm] = useState(false)
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [customerId, setCustomerId] = useState('')
    const [assignedUserId, setAssignedUserId] = useState('')
    const [status, setStatus] = useState('open')
    const [priority, setPriority] = useState('medium')
    const [createError, setCreateError] = useState('')

    // which ticket's notes section is expanded
    const [expandedTicketId, setExpandedTicketId] = useState(null)

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

    const handleCreateTicket = async (event) => {
        event.preventDefault()

        if (!customerId) {
            setCreateError('Please select a customer.')
            return
        }

        const response = await fetch('http://localhost:5000/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject,
                description,
                customer_id: parseInt(customerId),
                assigned_user_id: assignedUserId ? parseInt(assignedUserId) : null,
                status,
                priority,
            }),
        })

        const data = await response.json()

        if (response.ok) {
            fetch('http://localhost:5000/api/tickets')
                .then((r) => r.json())
                .then((ticketsData) => setTickets(ticketsData))

            setSubject('')
            setDescription('')
            setCustomerId('')
            setAssignedUserId('')
            setStatus('open')
            setPriority('medium')
            setCreateError('')
            setShowForm(false)
            setMessage('Ticket created successfully.')
        } else {
            setCreateError(data.error || 'Failed to create ticket.')
        }
    }

    const toggleNotes = (ticketId) => {
        setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId)
    }

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
                        onClick={() => {
                            setShowForm(!showForm)
                            setCreateError('')
                        }}
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        {showForm ? 'Cancel' : 'New Ticket'}
                    </button>
                </div>

                {message && (
                    <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                        {message}
                    </div>
                )}

                {showForm && (
                    <div className="mt-6 rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            New Ticket
                        </h2>

                        <form onSubmit={handleCreateTicket} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full rounded border p-2"
                                    placeholder="Brief summary of the issue"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full rounded border p-2"
                                    rows={4}
                                    placeholder="Full description of the issue"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Customer
                                    </label>
                                    <select
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        className="w-full rounded border p-2"
                                    >
                                        <option value="">Select a customer</option>
                                        {customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Assign To
                                    </label>
                                    <select
                                        value={assignedUserId}
                                        onChange={(e) => setAssignedUserId(e.target.value)}
                                        className="w-full rounded border p-2"
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full rounded border p-2"
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Priority
                                    </label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full rounded border p-2"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            {createError && (
                                <p className="text-sm text-red-600">{createError}</p>
                            )}

                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                            >
                                Create Ticket
                            </button>
                        </form>
                    </div>
                )}

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    {loading ? (
                        <p className="text-gray-500">Loading tickets...</p>
                    ) : tickets.length === 0 ? (
                        <p className="text-gray-500">No tickets found!</p>
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

                                    <div className="mt-3 border-t pt-3">
                                        <button
                                            type="button"
                                            onClick={() => toggleNotes(ticket.id)}
                                            className="text-sm text-gray-500 hover:text-gray-700"
                                        >
                                            {expandedTicketId === ticket.id
                                                ? 'Hide notes'
                                                : 'Show notes'}
                                        </button>

                                        {expandedTicketId === ticket.id && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-400">
                                                    No notes yet.
                                                </p>
                                            </div>
                                        )}
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