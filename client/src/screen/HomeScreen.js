import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import logger from 'use-reducer-logger'
import LoadingBox from './Components/LoadingBox'
import MessageBox from './Components/MessageBox'
import Product from './Components/Product'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message })
      }
    }
    fetchData()
  }, [])
  return (
    <div className='.scr-pad'>
      <Helmet>
        <title>JustFidel</title>
      </Helmet>
      <h1>
        Choose your <span className='inv'>INVESTMENT</span> wisely
      </h1>
      <div className='products'>
        {loading ? (
          <div>
            <LoadingBox />
          </div>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          products.map((product) => <Product product={product} />)
        )}
      </div>
    </div>
  )
}

export default HomeScreen
