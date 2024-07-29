import React, { useContext, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getError } from '../utils'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../contexts/StoreContext'

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false }

    default:
      return state
  }
}

export default function ProfileScreen() {
  const url = 'https://gloss-api.vercel.app'
  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const { userInfo } = state
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [phone, setPhone] = useState(userInfo.phone)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState(false)
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `${url}/api/users/profile`,
        {
          name,
          email,
          phone,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      )
      dispatch({
        type: 'UPDATE_SUCCESS',
      })
      ctxDispatch({
        type: 'USER_SIGNIN',
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('User updated successfully')
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      })
      toast.error(getError(err))
    }
  }

  return (
    <div className='container small-container'>
      <Helmet>User Profile</Helmet>
      <h1 className='my-3'>User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='tel'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Password</Form.Label>
          <div className='spacing0 spaceFlex p_rel'>
            <Form.Control
              type={show ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your new password'
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
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Confirm Password</Form.Label>
          <div className='spacing0 spaceFlex p_rel'>
            <Form.Control
              type={show ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your new password'
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
          <Button type='submit'>Update</Button>
        </div>
      </form>
    </div>
  )
}
