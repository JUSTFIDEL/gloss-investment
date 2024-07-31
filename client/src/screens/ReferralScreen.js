import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import { StoreContext } from '../contexts/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getError } from '../utils'
import MessageBox from '../components/MessageBox'
// import Button from 'react-bootstrap/esm/Button'

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

const ReferralScreen = () => {
  const { state } = useContext(StoreContext)
  const { userInfo } = state
  const navigate = useNavigate()

  const url = 'https://gloss-api.vercel.app'
  const refLink = `http://localhost:3000/signup?ref1=${userInfo.phone}`
  // const refLink = 'https://gross-peach.vercel.app'

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
    console.log(userInfo)
  }, [userInfo])
  return (
    <div>
      <Helmet>
        <title>Referrals</title>
      </Helmet>

      <h1>Referrals</h1>
      <Link to={refLink}>
        <p>
          <strong>My Referral Link:</strong> <br />
          {refLink}
        </p>
      </Link>

      {loading ? (
        <div className='loading_cont'>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <div className='lg_scr'>{/* for larger view */}</div>

          <div className='div_flex sm_scr'>{/* for mobile view */}</div>
        </div>
      )}
    </div>
  )
}

export default ReferralScreen
