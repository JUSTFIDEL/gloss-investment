import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import { StoreContext } from '../contexts/StoreContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getError } from '../utils'
import MessageBox from '../components/MessageBox'
// import { useParams } from 'react-router-dom'
// import Button from 'react-bootstrap/esm/Button'
// import { toast } from 'react-toastify'
// import authFetch from '../axios/custom'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, referrerData: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

const ReferralScreen1 = () => {
  const { state } = useContext(StoreContext)
  const { userInfo } = state
  const { referrerId } = useParams()

  // const params = useParams()
  // const { refno } = params
  // const navigate = useNavigate()

  const url = 'https://gloss-api.vercel.app'
  const refLink = `http://localhost:3000/?query=${userInfo.phone}`
  // const refLink = `https://gross-peach.vercel.app/?query=${userInfo.phone}`

  const [{ loading, error, referrerData }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    referrerData: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(
          `https://gloss-api.vercel.app/api/users/my/${referrerId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
    console.log(referrerData)
  }, [userInfo.token, referrerId, referrerData])

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
          {referrerData}
        </p>
      </Link>

      {loading ? (
        <div className='loading_cont'>
          <LoadingBox />
        </div>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        // <div>
        //   {loading ? (
        //     <div className='loading_cont'>
        //       <LoadingBox />
        //     </div>
        //   ) : error ? (
        //     <MessageBox variant='danger'>{error}</MessageBox>
        //   ) : (
        //     <>
        //       {/* for larger view */}
        //       <div className='lg_scr'>
        //         <h1>Referrals History</h1>
        //         <table className='table'>
        //           <thead>
        //             <tr>
        //               <th>NAME</th>
        //               <th>EMAIL</th>
        //               <th>PHONE</th>
        //             </tr>
        //           </thead>
        //           <tbody>
        //             {refData.map((ref) => (
        //               <tr key={ref._id}>
        //                 <td>{ref.name}</td>
        //                 <td>{ref.email}</td>
        //                 <td>{ref.phone}</td>
        //               </tr>
        //             ))}
        //           </tbody>
        //         </table>
        //       </div>

        //       {/* for mobile view */}
        //       <div className='div_flex sm_scr'>
        //         {refData.map((ref) => (
        //           <div key={ref._id}>
        //             <p>
        //               <strong>NAME:</strong> {ref.name}
        //             </p>
        //             <p>
        //               <strong>EMAIL:</strong> {ref.email}
        //             </p>
        //             <p>
        //               <strong>PHONE:</strong> {ref.phone}
        //             </p>
        //             <hr />
        //           </div>
        //         ))}
        //       </div>
        //     </>
        //   )}
        // </div>
        <>{referrerData}</>
      )}
    </div>
  )
}

export default ReferralScreen1
