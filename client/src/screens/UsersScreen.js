import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import authFetch from '../axios/custom'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/esm/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Rating from '../components/Rating'
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet-async'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { getError } from '../utils'
import { StoreContext } from '../contexts/StoreContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
const UsersScreen = () => {
  const [{ users, error, loading }, dispatch] = useReducer(reducer, {
    users: [],
    error: '',
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(
          `https://gloss-api.vercel.app/api/users/all`
        )
        // const result = await authFetch(url)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <h1>List of Users</h1>

      {loading ? (
        <div className='loading_cont'>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          {loading ? (
            <div className='loading_cont'>
              <LoadingBox />
            </div>
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
          ) : (
            <>
              {/* for larger view */}
              <div className='lg_scr'>
                <h1>Users</h1>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* for mobile view */}
              <div className='div_flex sm_scr'>
                {users.map((user) => (
                  <div key={user._id}>
                    <p>
                      <strong>NAME:</strong> {user.name}
                    </p>
                    <p>
                      <strong>EMAIL:</strong> {user.email}
                    </p>
                    <p>
                      <strong>PHONE:</strong> {user.phone}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default UsersScreen
