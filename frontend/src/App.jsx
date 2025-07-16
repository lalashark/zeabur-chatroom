import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

function App() {
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [chatLog, setChatLog] = useState([])

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/chat`)
            const data = await res.json()
            setChatLog(data)
        } catch (err) {
            console.error('Failed to fetch messages:', err)
        }
    }

    const sendMessage = async () => {
        if (!username || !message) return
        await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: username, message })
        })
        setMessage('')
        fetchMessages()
    }

    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h2>💬 Simple Chatroom</h2>
            <div>
                <input
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <hr />
            <div>
                {chatLog.map((msg, idx) => (
                    <div key={idx}>
                        <strong>[{msg.timestamp}] {msg.user}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
