import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardLink,
  CCardText,
  CCol,
  CImage,
  CRow,
} from '@coreui/react'
import { Delete, EditNote } from '@mui/icons-material'
import { Button, Skeleton } from '@mui/material'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../../firebase.config'

const Project = () => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(db, 'projects', params.projectId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProject(docSnap.data())
        setLoading(false)
      }
    }

    fetchProject()
  }, [navigate, params.projectId])

  if (loading) {
    return <Skeleton />
  }
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>{project.title}</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={12} md={6} xl={6}>
                <CImage rounded thumbnail src={project.image} />
                <hr className="mt-0" />
              </CCol>
              <CCol xs={12} md={6} xl={6}>
                <CCardText className="mt-3">{project.description}</CCardText>
                <hr className="mt-0 mb-5" />

                {project.githubLink && (
                  <CCardText>
                    gitHub: <CCardLink href={project.githubLink}>{project.githubLink}</CCardLink>
                  </CCardText>
                )}

                {project.liveLink && (
                  <CCardText>
                    live demo: <CCardLink href={project.liveLink}>{project.liveLink}</CCardLink>
                  </CCardText>
                )}

                <hr className="mt-5" />

                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  style={{ marginRight: '1rem' }}
                  color="error"
                >
                  Delete
                </Button>
                <Button variant="outlined" endIcon={<EditNote />} color="success">
                  Edit
                </Button>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    // <CCard className="mb-3">
    //   <CRow className="g-0">
    //     <CCol md={4}>
    //       <CCardImage src={project.image} />
    //     </CCol>
    //     <CCol md={8}>
    //       <CCardBody>
    //         <CCardTitle>Card title</CCardTitle>
    //         <CCardText>
    //           This is a wider card with supporting text below as a natural lead-in to additional
    //           content. This content is a little bit longer.
    //         </CCardText>
    //         <CCardText>
    //           <small className="text-body-secondary">Last updated 3 mins ago</small>
    //         </CCardText>
    //       </CCardBody>
    //     </CCol>
    //   </CRow>
    // </CCard>
  )
}
export default Project
