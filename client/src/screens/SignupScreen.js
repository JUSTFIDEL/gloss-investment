import { Link, useLocation, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../contexts/StoreContext'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import axios from 'axios'
// import Axios from 'axios'

function SignupScreen() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const url = 'https://gloss-api.vercel.app/api/users/signup'
  const { state, dispatch } = useContext(StoreContext)
  const { userInfo } = state

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } else {
      toast.success('Successfully signed up.')
    }

    try {
      const { data } = await axios.post(url, { name, email, password })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (err) {
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <h1 className='my-3 dark_gradient'>Register</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            required
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your username'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <div className='spacing0 spaceFlex p_rel'>
            <Form.Control
              type={show ? 'text' : 'password'}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
            />
            <div
              className='spacing0 x30 p_abs dis_flex'
              onClick={() => setShow(!show)}
            >
              {show && <i class='fa-solid fa-eye'></i>}
              {!show && <i class='fa-solid fa-eye-slash'></i>}
            </div>
          </div>
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <div className='spacing0 spaceFlex p_rel'>
            <Form.Control
              type={show ? 'text' : 'password'}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
            />
            <div
              className='spacing0 x30 p_abs dis_flex'
              onClick={() => setShow(!show)}
            >
              {show && <i class='fa-solid fa-eye'></i>}
              {!show && <i class='fa-solid fa-eye-slash'></i>}
            </div>
          </div>
        </Form.Group>

        <div className='mb-3'>
          <Button type='submit' variant='success'>
            Sign Up
          </Button>
        </div>

        <div className='mb-3'>
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`} className='green1'>
            Sign In
          </Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignupScreen
