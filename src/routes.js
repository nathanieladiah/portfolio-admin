import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Messages = React.lazy(() => import('./views/messages/Messages'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/messages', name: 'Messages', element: Messages },
]

export default routes
