import { CSpinner } from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config'

const Messages = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, 'messages')

        const q = query(messagesRef, orderBy('timestamp', 'desc'))

        const querySnap = await getDocs(q)

        const messages = []
        querySnap.forEach((doc) => {
          return messages.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setMessages(messages)
        setLoading(false)
      } catch (error) {
        alert('Could not fetch messages')
      }
    }

    fetchMessages()
  }, [])

  const columns = [
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'message', headerName: 'Message', flex: 1 },
    { field: 'time', headerName: 'Time' },
  ]

  if (loading) {
    return <CSpinner />
  }

  return (
    <div>
      {messages && (
        <DataGrid
          sx={{
            backgroundColor: 'white',
          }}
          rows={messages.map((message) => ({
            id: message.id,
            email: message.data.email,
            message: message.data.message,
            name: message.data.name,
            time: message.data.timestamp.toDate().toLocaleString('en-GB'),
          }))}
          columns={columns}
        />
      )}
    </div>
  )
}
export default Messages
