import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
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
  // const [searchParams, setSearchParams] = useSearchParams()
  // const [query, setQuery] = useState(searchParams.get('query_ref'))
  const [refId, setRefId] = useState()

  const url = 'https://gloss-api.vercel.app/api/users/signup'
  const { state, dispatch } = useContext(StoreContext)
  const { userInfo } = state

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [referredBy, setReferredBy] = useState()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState(false)

  // const [validated, setValidated] = useState(false)

  const checkLs = (e) => {
    if (localStorage.getItem('query')) {
      const query = localStorage.getItem('query')
      setReferredBy(query)
    } else {
      setReferredBy(e.target.value)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!name || name.length < 3) {
      toast.error('Name must be at least 3 letters')
      return
    } else if (!email) {
      toast.error('Enter email')
      return
    } else if (!referredBy) {
      toast.error('Enter referrer phone number')
      return
    } else if (!phone || phone.length !== 11) {
      toast.error('Enter 11 digits phone number')
      return
    } else if (!password || password.length <= 5 || password.length > 20) {
      toast.error('Password must be between 6 - 20 characters')
      return
    } else if (
      !confirmPassword ||
      confirmPassword.length <= 5 ||
      confirmPassword.length > 20
    ) {
      toast.error('Confirm password must be between 6 -20 characters')
      return
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } else {
      toast.success('Successfully signed up.')
    }

    try {
      const { data } = await axios.post(url, {
        name,
        email,
        phone,
        referredBy,
        password,
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (err) {
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('query')) {
      const query1 = localStorage.getItem('query')
      setRefId(query1)
    }

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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            required
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
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

        <Form.Group className='mb-3' controlId='phone'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            // pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            required
            onChange={(e) => setPhone(e.target.value)}
            placeholder='080XXXXXXXX'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='referredBy'>
          <Form.Label>Referred By</Form.Label>
          <Form.Control
            type='text'
            defaultValue={refId}
            onChange={checkLs}
            // onChange={(e) => setReferredBy(e.target.value)}
            placeholder='Enter referrer phone number'
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
