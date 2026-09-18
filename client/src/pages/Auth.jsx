import { useState } from 'react'

function Auth() {
    const [showLoginForm, setShowLoginForm] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async (event) => {
        event.preventDefault()

        const response = await fetch('http://127.0.0.1:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        console.log(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                <h1 className="text-center text-3xl font-bold">
                    SupportDesk
                </h1>

                <div className="mt-6 flex gap-2">
                    <button
                        onClick={() => setShowLoginForm(true)}
                        className="flex-1 rounded bg-gray-200 px-4 py-2"
                    >
                        Log In
                    </button>

                    <button
                        onClick={() => setShowLoginForm(false)}
                        className="flex-1 rounded bg-gray-200 px-4 py-2"
                    >
                        Sign Up
                    </button>
                </div>

                {showLoginForm ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">
                            Log In
                        </h2>

                        <div className="mt-4 space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded border p-2"
                            />

                            <button className="w-full rounded bg-blue-600 px-4 py-2 text-white">
                                Log In
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="mt-6">
                        <h2 className="text-xl font-semibold">
                            Sign Up
                        </h2>

                        <div className="mt-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full rounded border p-2"
                            />

                            <button
                                type="submit"
                                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Auth