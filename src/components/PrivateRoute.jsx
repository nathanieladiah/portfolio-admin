import { CSpinner } from '@coreui/react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <CSpinner color="primary" variant="grow" />
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoute
