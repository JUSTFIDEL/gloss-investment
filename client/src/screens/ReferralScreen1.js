import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import { StoreContext } from '../contexts/StoreContext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { getError } from '../utils'
import MessageBox from '../components/MessageBox'
import Button from 'react-bootstrap/esm/Button'
// import { useParams } from 'react-router-dom'
// import Button from 'react-bootstrap/esm/Button'
// import { toast } from 'react-toastify'
// import authFetch from '../axios/custom'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, myReferrer: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

const ReferralScreen1 = () => {
  const { state } = useContext(StoreContext)
  const { userInfo } = state
  // const { referrerId } = useParams()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [referrerId, setReferrerId] = useState(searchParams.get('query'))
  const [message, setMessage] = useState('')

  // const params = useParams()
  // const { refno } = params
  // const navigate = useNavigate()

  const url = 'https://gloss-api.vercel.app'
  // const refLink = `http://localhost:3000/?query=${userInfo.phone}`
  const refLink = `https://gross-peach.vercel.app/?query=${userInfo.phone}`

  const date = new Date() // Replace with your date
  const isFirstOfMonth = date.getDate() === 1

  const [{ loading, error, myReferrer }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    myReferrer: [],
  })

  // setReferrerId(userInfo.phone)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })

        const { data } = await axios.get(
          `https://gloss-api.vercel.app/api/users/my/${userInfo.phone}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        )
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }

    // if (!userInfo) {
    //   return navigate('/login')
    // }

    fetchData()
  }, [userInfo, referrerId])

  const copyToClipboard = () => {
    const copyVal = navigator.clipboard.writeText(
      `https://gross-peach.vercel.app/?query=${userInfo.phone}`
    )

    copyVal
      .then(() => {
        setMessage('copied ✔✔')
      })
      .catch(() => {
        setMessage('copy failed')
      })
      .finally(() => {
        setTimeout(() => {
          setMessage('')
        }, 1000)
      })
  }

  return (
    <div>
      <Helmet>
        <title>Referrals</title>
      </Helmet>

      <div className='iFlex1'>
        <div className='mw-350'>
          <div className='mb1'>
            <h1 className='refer_head'>Refer friends and earn.</h1>
            <p className='refer_info'>
              Invite your friends and earn 10% of their first investment as
              referral bonus.
            </p>
          </div>

          <div className='p_rel'>
            <p>
              <span className='green_1'>Referral Link:</span> <br />
              <span className='ref_link'>{refLink}</span>
            </p>

            <span onClick={() => copyToClipboard()}>
              <i className='fa-regular fa-copy pos_tr cur_ptr'></i>
            </span>

            <span className='flash_Mes'>{message}</span>
          </div>

          <div className='dis_flex1 mb1'>
            <span className='share_des'>Share Link:</span> <br />
            <Link
              to={`https://wa.me/?text=${refLink}`}
              className='ref_icon_cont wa_green'
              target='_blank'
            >
              <i class='fa-brands fa-whatsapp'></i>
            </Link>
            {/* <Link
              to={`https://wa.me/?text=${refLink}`}
              className='ref_icon_cont x_blue'
                                    target='_blank'

            >
              <i class='fa-brands fa-x-twitter'></i>
            </Link> */}
            {/* <Link
              to={`https://wa.me/?text=${refLink}`}
              className='ref_icon_cont fb_blue'
                                    target='_blank'

            >
              <i class='fa-brands fa-facebook-f'></i>
            </Link> */}
          </div>
        </div>

        <div className='ref_bod'>
          <span className='green_1'>Referral Bonus:</span>

          <p>
            <strong>Amount: </strong>₦{userInfo.bonus.toLocaleString()}
          </p>
          {isFirstOfMonth ? (
            <Button type='button' variant='success'>
              Withdraw Bonus
            </Button>
          ) : (
            <Button type='button' variant='light' className='dis00'>
              Withdraw Bonus
            </Button>
          )}

          <br />
          <span className='red1'>
            NB: Can only be withdrawn once, on the 1st of each month.
          </span>
        </div>
      </div>

      <p>
        <span className='green_1'>My Referrals:</span>
      </p>
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
                <table className='table'>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myReferrer.map((ref) => (
                      <tr key={ref._id}>
                        <td>{ref.name}</td>
                        <td>{ref.email}</td>
                        <td>{ref.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* for mobile view */}
              <div className='div_flex sm_scr'>
                {myReferrer.map((ref) => (
                  <div key={ref._id}>
                    <p>
                      <strong>NAME:</strong> {ref.name}
                    </p>
                    <p>
                      <strong>EMAIL:</strong> {ref.email}
                    </p>
                    <p>
                      <strong>PHONE:</strong> {ref.phone}
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

export default ReferralScreen1
