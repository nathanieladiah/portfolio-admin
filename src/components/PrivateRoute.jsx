import { Skeleton } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Skeleton />
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoute
