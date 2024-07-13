import axios from 'axios'
import Button from 'react-bootstrap/Button'
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { getError } from '../utils'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { StoreContext } from '../contexts/StoreContext'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default function OrderHistoryScreen() {
  const { state } = useContext(StoreContext)
  const { userInfo } = state
  const navigate = useNavigate()

  const url = 'http://localhost:8000'

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const { data } = await axios.get(`${url}/api/orders/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [userInfo])

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <div className='lg_scr'>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DUE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                    {/* <td>{order.isPaid ? order.paidAt : 'No'}</td> */}
                    <td>{order.isDue ? 'Yes' : 'No'}</td>
                    <td>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => {
                          navigate(`/order/${order._id}`)
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='div_flex sm_scr'>
            {orders.map((order) => (
              <div key={order._id}>
                <p>
                  <strong>ID:</strong> {order._id}
                </p>
                <p>
                  <strong>DATE:</strong> {order.createdAt.substring(0, 10)}
                </p>
                <p>
                  <strong>TOTAL:</strong> {order.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>PAID:</strong> {order.isPaid ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>DUE:</strong> {order.isDue ? 'Yes' : 'No'}
                </p>
                <p>
                  <Button
                    type='button'
                    variant='dark'
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
