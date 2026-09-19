// central helper so every fetch call sends the jwt token automatically

export function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token')

    return fetch(`http://localhost:5000${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })
}