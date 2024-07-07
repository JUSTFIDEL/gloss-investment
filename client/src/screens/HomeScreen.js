import React, { useEffect, useReducer } from 'react'
import authFetch from '../axios/custom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from '../components/Products'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

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
  // const [products, setProducts] = useState([])
  const [{ products, error, loading }, dispatch] = useReducer(reducer, {
    products: [],
    error: '',
    loading: true,
  })

  const url = '/api/products'

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await authFetch(url)
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
        <title>Gross</title>
      </Helmet>
      <div className='max-width'>
        <h1 className='dark_gradient p_dropIn'>
          Invest and make <span className='text-blue-600'>MONEY</span> while
          asleep.
        </h1>

        <div className='hero_cont'>
          <div className='hero_text'>
            <span className='p_fadeOff textGray'>
              Welcome! In Gross, we believe in the power of collaboration and
              mutual support among our members. By coming together and pooling
              our resources, we are able to build a larger capital base that
              opens up greater opportunities for investment. <br />
              <br />
              This collective approach allows us to diversify our investment
              portfolio, minimize risks, and potentially achieve higher returns.
              Our shared goal is to work together towards financial growth and
              success, leveraging the strength of our combined resources to
              secure a brighter future for all members involved.
            </span>
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
            <Button variant='success'>Register Now</Button>
          </Link>
        </div>
      </div>

      <div className='m_top'>
        <h1 className='feat-prod'>Choose an Investment Portfolio below.</h1>
      </div>

      <div className='products'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className='m_bot'>
                <Products product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
