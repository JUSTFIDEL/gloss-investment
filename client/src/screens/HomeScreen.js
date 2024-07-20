import React, { useContext, useEffect, useReducer } from 'react'
// import authFetch from '../axios/custom'
import Products from '../components/Products'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../contexts/StoreContext'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

const HomeScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const { cart, userInfo } = state

  // const [products, setProducts] = useState([])
  const [{ products, error, loading }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(
          'https://gloss-api.vercel.app/api/products'
        )
        // const result = await axios.get('https://gloss-api.vercel.app/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
      // setProducts(data)
    }
    fetchData()
  }, [])

  return (
    <div className='sm_container'>
      <Helmet>
        <title>Home | Gross</title>
      </Helmet>
      {!userInfo && (
        <div>
          <h1 className='dark_gradient p_dropIn'>
            Invest and make <span className='green_gradient'>MONEY</span> while
            asleep.
          </h1>

          <div className='hero_cont'>
            <div className='hero_text'>
              <p className='p_fadeOff textGray'>
                {/* Welcome! In Gross, we believe in the power of collaboration and
              mutual support among our members. By coming together and pooling
              our resources, we are able to build a larger capital base that
              opens up greater opportunities for investment. <br />
              <br />
              This collective approach allows us to diversify our investment
              portfolio, minimize risks, and potentially achieve higher returns.
              Our shared goal is to work together towards financial growth and
              success, leveraging the strength of our combined resources to
              secure a brighter future for all members involved. */}
                Welcome! At Gross, we emphasize the strength of collaboration
                and support among our members. By uniting and combining
                resources, we can expand our capital base for diverse investment
                opportunities. This strategy enables us to invest in various
                assets such as cryptocurrencies like Bitcoin, USDT, and
                Ethereum, as well as traditional resources like Gold and Forex
                trading. <br />
                <br />
                Through our collective effort, we aim to diversify our
                investment portfolio, mitigate risks, and strive for greater
                returns. Our shared vision is to foster financial growth and
                success by leveraging our combined resources to pave the way for
                a prosperous future for all members.
              </p>
            </div>
            <div className='hero_img'>
              <img
                src='/images/animated1.gif'
                alt='hero video'
                className='hero_img1'
              />
            </div>
          </div>
          <div className='my-3'>
            <Link to='/signup'>
              <Button className='buttonColor'>Register Now</Button>
            </Link>
            <Link to='/signin'>
              <Button className='buttonColor1'>Sign In</Button>
            </Link>
          </div>
        </div>
      )}

      <div className={userInfo ? 'mt1' : 'm_top'}>
        <h1 className='feat-prod'>Choose a Portfolio💰.</h1>
      </div>

      <div className='products'>
        {loading ? (
          <div className='mxa'>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          products.map((product) => <Products product={product} />)

          // <Row>
          //   {products.map((product) => (
          //     <Col key={product._id} sm={6} md={4} lg={3} className='m_bot'>
          //       <Products product={product} />
          //     </Col>
          //   ))}
          // </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
