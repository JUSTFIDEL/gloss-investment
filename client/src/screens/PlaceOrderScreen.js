import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { getError } from '../utils'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../contexts/StoreContext'
import CheckoutStep from '../components/CheckoutStep'
import LoadingBox from '../components/LoadingBox'
import authFetch from '../axios/custom'

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true }
    case 'CREATE_SUCCESS':
      return { ...state, loading: false }
    case 'CREATE_FAIL':
      return { ...state, loading: false }

    default:
      return state
  }
}

export default function PlaceOrderScreen() {
  const navigate = useNavigate()

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  })

  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const { cart, userInfo } = state

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 To 123.23 (2 Decimal Places)
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )

  // const getTax = async (product) => {
  //   const url = `/api/products/${product._id}`
  //   const { data } = await authFetch(url)
  //   console.log(data.rate)
  //   return data.rate
  // }
  cart.dueAt = new Date(
    new Date().setDate(new Date().getDate() + 30)
  ).toUTCString()
  cart.paidAt = new Date().toUTCString()
  // cart.paidAt = new Date().toLocaleString()

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  const percentage = cart.itemsPrice > 200000 ? 0.4 : 0.3
  // cart.taxPrice = round2({ getTax } * cart.itemsPrice)
  // cart.taxPrice = round2(
  //   `{${cart.itemsPrice} > 200000 ? 0.4 : 0.3}` * cart.itemsPrice
  // )
  cart.taxPrice = round2(percentage * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.taxPrice
  // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' })

      const { data } = await axios.post(
        'http://localhost:8000/api/orders',
        {
          orderItems: cart.cartItems,
          bankDetails: cart.bankDetails,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          paidAt: cart.paidAt,
          dueAt: cart.dueAt,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      ctxDispatch({ type: 'CART_CLEAR' })
      dispatch({ type: 'CART_SUCCESS' })
      localStorage.removeItem('cartItems')
      navigate(`/order/${data.order._id}`)
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' })
      toast.error(getError(err))
    }
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [navigate, cart])

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>
                <strong className='green_1'>Bank Details</strong>
              </Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.bankDetails.fullName} <br />
                <strong>Bank:</strong> {cart.bankDetails.bank} <br />
                <strong>Account Number:</strong> {cart.bankDetails.accountNum}
              </Card.Text>
              <Link to='/bank' className='green_1 link_deco'>
                Edit
              </Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>
                <strong>Payment</strong>
              </Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to='/payment' className='green_1 link_deco'>
                Edit
              </Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>
                <strong>Items</strong>
              </Card.Title>
              <ListGroup variant='flush'>
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <div className='space_btw'>
                        <Col md={6}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className='img-fluid rounded img-thumbnail'
                          />{' '}
                          <Link
                            to={`/product/${item._id}`}
                            className='green_1 name_bold'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={3} className='name_bold'>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3} className='name_bold'>
                          ₦{item.price.toLocaleString()}
                        </Col>
                      </div>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to='/cart' className='green_1 link_deco'>
                Edit
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className='green_1'>
                <strong>Order Summary</strong>
              </Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Amount:</Col>
                    <Col>₦{cart.itemsPrice.toLocaleString()}</Col>
                    {/* <Col>₦{cart.itemsPrice.toFixed(2)}</Col> */}
                  </Row>
                </ListGroup.Item>

                {/* <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₦{cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item> */}

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>₦0.00</Col>
                    {/* <Col>₦{cart.taxPrice.toFixed(2)}</Col> */}
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total Payment:</Col>
                    <Col>
                      <strong>
                        ₦{cart.itemsPrice.toLocaleString()}
                        {/* ₦{cart.itemsPrice.toFixed(2)} */}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* <ListGroup.Item>
                  <Row>
                    <Col>Order Total</Col>
                    <Col>
                      <strong>₦{cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item> */}

                <ListGroup.Item>
                  <div className='mb1'>
                    <Button
                      className='signing-btn'
                      type='button'
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                      variant='success'
                    >
                      Make Payment
                    </Button>
                  </div>
                  <div className='pad-top'>{loading && <LoadingBox />}</div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
