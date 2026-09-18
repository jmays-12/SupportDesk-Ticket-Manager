import { useEffect, useState } from 'react'

function Customers() {
    document.title = "SupportDesk - Customers"

    const [customers, setCustomers] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [message, setMessage] = useState('')
    const [messageIsError, setMessageIsError] = useState(false)

    // state manager for Add Customer form
    const [isMinimized, setIsMinimized] = useState(true)


    //regex patterns for form validation
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/
    const phoneRegex = /^[0-9+().\-\s]+$/

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/customers')
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data)
            })
    }, [])

    const handleCreateCustomer = async (event) => {
        event.preventDefault()

        if (!emailRegex.test(email)) {
            setMessage('Please enter a valid email address.')
            setMessageIsError(true)
            return
        }

        const response = await fetch('http://127.0.0.1:5000/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone_number: phoneNumber,
            }),
        })

        const data = await response.json()

        if (response.ok) {
            setCustomers([...customers, data])
            setName('')
            setEmail('')
            setPhoneNumber('')
            setMessage('Customer created successfully.')
            setMessageIsError(false)
        } else {
            setMessage(data.error || 'Failed to create customer.')
            setMessageIsError(true)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Customers
                </h1>

                <p className="mt-2 text-gray-600">
                    View and manage customer records.
                </p>

                {message && (
                    <div
                        className={
                            messageIsError
                                ? 'mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700'
                                : 'mt-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700'
                        }
                    >
                        {message}
                    </div>
                )}

                <div className="fixed bottom-6 right-6 w-80 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Add Customer
                        </h2>

                        <button
                            type="button"
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 text-xl text-gray-600"
                        >
                            {isMinimized ? '+' : '-'}
                        </button>
                    </div>

                    {!isMinimized && (
                        <form onSubmit={handleCreateCustomer} className="space-y-4 p-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="text"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(event.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Add Customer
                            </button>
                        </form>
                    )}

                </div>


                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    {customers.length === 0 ? (
                        <p className="text-gray-500">
                            No customers in database.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {customers.map((customer) => (
                                <div
                                    key={customer.id}
                                    className="rounded border p-4"
                                >
                                    <h2 className="font-semibold text-gray-900">
                                        {customer.name}
                                    </h2>

                                    <p className="text-gray-600">
                                        {customer.email}
                                    </p>

                                    {customer.phone_number && (
                                        <p className="text-gray-600">
                                            {customer.phone_number}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Customers
