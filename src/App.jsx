import React, { useState } from 'react'
import ChatMessage from './components/ChatMessage'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const newMessage = { sender: 'user', text: input }
    setMessages([...messages, newMessage])

    setMessages(prev => [...prev, { sender: 'ai', text: 'Thinking...' }])

    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { sender: 'ai', text: 'This is a response from Neroxa AI.' }
        return updated
      })
    }, 1000)

    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4 text-2xl font-bold bg-white shadow">Neroxa AI</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="p-4 bg-white flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
