import { useEffect, useState } from 'react'

function Customers() {
    document.title = "SupportDesk - Customers"

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/customers')
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data)
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Customers
                </h1>

                <p className="mt-2 text-gray-600">
                    View and manage customer records.
                </p>

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    {customers.length === 0 ? (
                        <p className="text-gray-500">
                            No customers to display yet.
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