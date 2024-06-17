import { CButton, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react'
import { Skeleton } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase.config'

const Message = () => {
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchMessage = async () => {
      const docRef = doc(db, 'messages', params.messageId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setMessage(docSnap.data())
        setLoading(false)
      }
    }

    fetchMessage()
  }, [navigate, params.messageId])

  if (loading) {
    return <Skeleton style={{ height: 200 }} />
  }

  const { name, content, email, timestamp } = message

  return (
    <CCard>
      <CCardBody>
        <CCardTitle>{name}</CCardTitle>
        <CCardSubtitle className="mb-2 text-body-secondary">
          {email} - {timestamp.toDate().toLocaleString('en-GB')}
        </CCardSubtitle>
        <CCardText className="mt-4">{content}</CCardText>
        <CButton
          className="mt-3"
          color="primary"
          type="button"
          onClick={() => navigate('/messages')}
        >
          Back to messages
        </CButton>
      </CCardBody>
    </CCard>
  )
}
export default Message
