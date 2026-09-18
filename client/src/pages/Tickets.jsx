function Tickets() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Tickets
                </h1>

                <p className="mt-2 text-gray-600">
                    View and manage support tickets.
                </p>

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <p className="text-gray-500">
                        No tickets to display yet.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Tickets