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
      return { ...state, loading: false, product: action.payload }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

const ProductScreen = () => {
  const params = useParams()
  const { slug } = params
  const navigate = useNavigate()

  const [{ product, error, loading }, dispatch] = useReducer(reducer, {
    product: [],
    error: '',
    loading: true,
  })

  // /api/products/slug/${slug}

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/slug/${slug}`)
        // const result = await authFetch(url)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }
    fetchData()
  }, [slug])

  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const { cart } = state

  // const productPrice = product.price.toLocaleString()

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const url = `/api/products/${product._id}`
    const { data } = await axios.get(url)
    // const { data } = await authFetch(url)

    // if (data.countInStock < quantity) {
    // 	alert('Sorry, Product is out of stock')
    // 	return
    // }
    if (data.countInStock < quantity) {
      toast.error('Sorry, Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    })

    navigate('/cart')
  }

  return loading ? (
    <div className='loading_cont'>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div className='m_top1'>
      <Row>
        <Col md={6}>
          <img className='img-large' src={product.image} alt={product.name} />
        </Col>
        <Col md={3} className='mt2'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h3 className='green_1'>{product.name} Package</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Amount:</strong> ₦{product.price.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Interest:</strong> ₦{product.interest.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card className='mt2'>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price:</strong>
                    </Col>
                    <Col>₦{product.price.toLocaleString()}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Status:</strong>
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>Pending</Badge>
                      ) : (
                        <Badge bg='danger'>Out of Stock</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button variant='success' onClick={addToCartHandler}>
                        Select
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
