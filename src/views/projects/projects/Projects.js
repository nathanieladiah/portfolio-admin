import { cilCheckCircle, cilImage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CImage,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Skeleton } from '@mui/material'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase.config'

const Projects = () => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState(null)

  const navigate = useNavigate()

  const handleRowClick = (id) => {
    navigate(`/projects/${id}`)
  }

  const changeDisplay = (id) => {}

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects')
        const q = query(projectsRef, orderBy('title', 'asc'))
        const querySnap = await getDocs(q)

        const projects = []
        querySnap.forEach((doc) => {
          return projects.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setProjects(projects)
        setLoading(false)
      } catch (error) {
        alert('Could not fetch projects')
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <Skeleton style={{ height: 200 }} />
  }

  return (
    <CCard>
      <CCardHeader>Projects</CCardHeader>
      <CCardBody>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                <CIcon icon={cilImage} />
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Title</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Desc</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Display</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {projects.map((project) => (
              <CTableRow v-for="item in tableItems" key={project.id}>
                <CTableDataCell className="text-center" onClick={() => handleRowClick(project.id)}>
                  <CImage rounded thumbnail src={project.image} width={200} height={100} />
                </CTableDataCell>
                <CTableDataCell onClick={() => handleRowClick(project.id)}>
                  <div>{project.title}</div>
                </CTableDataCell>
                <CTableDataCell onClick={() => handleRowClick(project.id)}>
                  <div>{project.description}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CIcon
                    icon={cilCheckCircle}
                    className="text-success"
                    onClick={() => changeDisplay(project.id)}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
export default Projects
