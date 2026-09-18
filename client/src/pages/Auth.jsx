import { useState } from 'react'

function Auth() {
    const [showLoginForm, setShowLoginForm] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

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

    const handleLogin = async (event) => {
        event.preventDefault()

        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword,
            }),
        })

        const data = await response.json()

        console.log(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                <h1 className="text-center text-4xl font-bold">
                    SupportDesk
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Manage customer tickets from one central app.
                </p>

                {showLoginForm ? (
                    <form onSubmit={handleLogin} className="mt-6">
                        <h2 className="text-xl font-semibold">
                            Log In
                        </h2>

                        <div className="mt-4 space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={(event) => setLoginEmail(event.target.value)}
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(event) => setLoginPassword(event.target.value)}
                                className="w-full rounded border p-2"
                            />

                            <button
                                type="submit"
                                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
                            >
                                Log In
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?
                                <button
                                    type="button"
                                    onClick={() => setShowLoginForm(false)}
                                    className="ml-1 text-blue-600 hover:underline"
                                >
                                    Click here to sign up.
                                </button>
                            </p>
                        </div>
                    </form>
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

                            <p className="text-center text-sm text-gray-500">
                                Already have an account?
                                <button
                                    type="button"
                                    onClick={() => setShowLoginForm(true)}
                                    className="ml-1 text-blue-600 hover:underline"
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Auth