import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Messages = React.lazy(() => import('./views/messages/messages/Messages'))
const Message = React.lazy(() => import('./views/messages/message/Message'))
const Projects = React.lazy(() => import('./views/projects/projects/Projects'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/messages', name: 'Messages', element: Messages },
  { path: '/messages/:messageId', element: Message },
  { path: '/projects', name: 'Projects', element: Projects },
]

export default routes
