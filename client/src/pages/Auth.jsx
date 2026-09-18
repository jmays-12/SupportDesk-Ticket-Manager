import { useState } from 'react'

function Auth() {
    const [showLoginForm, setShowLoginForm] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [message, setMessage] = useState('')
    const [messageIsError, setMessageIsError] = useState(false)

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
        if (response.ok) {
            setMessage('Account created successfully. You can now log in.')
            setMessageIsError(false)
        } else {
            setMessage(
                data.error === 'Email already in use'
                    ? 'That email is already in use. Please log in or use another email address.'
                    : data.error || 'Signup failed. Please contact an administrator.'
            )
            setMessageIsError(true)
        }
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

        if (response.ok) {
            setMessage(`Welcome back, ${data.name} !`)
            setMessageIsError(false)
        } else {
            setMessage(
                data.error ||
                'Login failed. Please check your login details and try again.'
            )
            setMessageIsError(true)
        }
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

                {message && (
                    <div
                        className={
                            messageIsError
                                ? 'mt-4 w-full rounded border border-red-300 bg-red-50 p-3 text-center text-sm text-red-700'
                                : 'mt-4 w-full rounded border border-gray-200 bg-gray-50 p-3 text-center text-sm text-gray-700'
                        }
                    >
                        {message}
                    </div>
                )}

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
                                onChange={(event) =>
                                    setLoginEmail(event.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(event) =>
                                    setLoginPassword(event.target.value)
                                }
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
                                    onClick={() => {
                                        setShowLoginForm(false)
                                        setMessage('')
                                        setMessageIsError(false)
                                    }}
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
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
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
                                    onClick={() => {
                                        setShowLoginForm(true)
                                        setMessage('')
                                        setMessageIsError(false)
                                    }}
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