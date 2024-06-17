import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase.config'
import useAuthStatus from '../../../hooks/useAuthStatus'

const Login = () => {
  const [loginError, setLoginError] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const { username, password } = formData
  const { loggedIn, checkingStatus } = useAuthStatus

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, username, password)

      if (userCredentials.user) {
        navigate('/')
      }
    } catch (error) {
      setLoginError(true)
    }
  }

  if (checkingStatus) {
    return <CSpinner />
  }

  if (loggedIn) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex align-items-center flex-column justify-content-center">
      {loginError && (
        <CAlert
          color="danger"
          dismissible
          onClose={() => {
            setLoginError(false)
          }}
        >
          <strong>Error:</strong> Invalid User Credentials
        </CAlert>
      )}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={onChange}
                        value={username}
                        name="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={onChange}
                        value={password}
                        name="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
