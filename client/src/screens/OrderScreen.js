import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
// import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getError } from '../utils'
import { toast } from 'react-toastify'
import { StoreContext } from '../contexts/StoreContext'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js/dist/cjs/react-paypal-js.min'
import Button from 'react-bootstrap/esm/Button'
// import DueDate from '../components/DueDate'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true }
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true }
    case 'PAY_FAIL':
      return { ...state, loadingPay: false }
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false }

    default:
      return state
  }
}

export default function OrderScreen() {
  const { state } = useContext(StoreContext)
  const { userInfo } = state
  const [clicked, setClicked] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const dateToString = new Date().toUTCString()
  // const dateToString = new Date()

  // const dueDate = new Date(new Date().setDate(new Date().getDate() + 30))

  const url = 'https://gloss-api.vercel.app'

  const params = useParams()
  const { id: orderId } = params
  const navigate = useNavigate()

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
      successPay: false,
      loadingPay: false,
    })

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID
      })
  }

  // function onApprove(data, actions) {
  //   return actions.order.capture().then(async function (details) {
  //     try {
  //       dispatch({ type: 'PAY_REQUEST' })
  //       const { data } = await axios.put(
  //         `${url}/api/orders/${order._id}/pay`,
  //         details,
  //         {
  //           headers: { authorization: `Bearer ${userInfo.token}` },
  //         }
  //       )
  //       dispatch({ type: 'PAY_SUCCESS', payload: data })
  //       toast.success('Order is paid')
  //     } catch (err) {
  //       dispatch({ type: 'PAY_FAIL', payload: getError(err) })
  //       toast.error(getError(err))
  //     }
  //   })
  // }

  // function onError(err) {
  //   toast.error(getError(err))
  // }

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  const withdrawalHandler = () => {
    // let timeout;
    try {
      setIsProcessing(true)
      setClicked(true)
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(setIsProcessing(false), 3000)
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`${url}/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }

    if (!userInfo) {
      return navigate('/login')
    }

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder()
      if (successPay) {
        dispatch({ type: 'PAY_RESET' })
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(`${url}/api/keys/paypal`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      loadPaypalScript()
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay])

  return loading ? (
    <div className='loading_cont'>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Payment Order {orderId}</title>
      </Helmet>
      <h1 className='my-3'>Payment Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>Payment Details:</Card.Title>
              <Card.Text>
                <strong>Method: </strong> {order.paymentMethod}
                <br />
                <strong>Amount: </strong>₦{order.itemsPrice.toLocaleString()}
                <br />
                <strong>Name: </strong> Gross Inv.
                <br />
                <strong>Bank: </strong> Moniepoint MFB
                <br />
                <strong>Account Number: </strong> 8121146164
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant='success'>
                  <div className='iFlex'>
                    <p className='spacing0'>
                      <strong>Paid on {order.paidAt}</strong>
                    </p>
                    {/* <p className='spacing0'>Paid on {dateToString}</p> */}
                    <p className='spacing0'>
                      <img
                        src='/images/checkmark.svg'
                        alt='checked'
                        className='circle'
                      />
                    </p>
                  </div>
                  {/* Paid at {order.paidAt} */}
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>
                  <div className='iFlex'>
                    <p className='spacing0'>Not Paid</p>
                    <p className='spacing0'>
                      <img src='/images/red-x.svg' alt='X' className='circle' />
                    </p>
                  </div>
                </MessageBox>
              )}
              <Card.Text>
                <div className='iFlex'>
                  <Link
                    to='https://t.me/+lmKURZnL3L0zZDlk'
                    className='green_1 name_bold'
                  >
                    <strong>Click to submit proof after payment ➡</strong>
                  </Link>

                  <Button type='button' variant='success'>
                    <Link
                      to='https://t.me/+lmKURZnL3L0zZDlk'
                      className='white_1'
                      target='_blank'
                    >
                      Send Proof
                    </Link>
                  </Button>
                  {/* )} */}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>Withdrawal Details</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.bankDetails.fullName}
                <br />
                <strong>Bank: </strong> {order.bankDetails.bank},
                <br />
                <strong>Account Number: </strong> {order.bankDetails.accountNum}
              </Card.Text>

              {/* Due date box */}
              {order.isDue ? (
                <MessageBox variant='success'>
                  <div>
                    {order.isPaid && (
                      <div className='iFlex'>
                        <p className='spacing0'>
                          <strong>
                            Payment will be automatically processed on{' '}
                            {order.dueAt}
                          </strong>
                        </p>
                      </div>
                    )}
                  </div>
                </MessageBox>
              ) : (
                // <MessageBox variant='success'>
                //   <div>
                //     {order.isPaid && (
                //       <div className='iFlex'>
                //         <p className='spacing0'>
                //           <strong>Due on {order.dueAt}</strong>
                //         </p>

                //         {'Sat, 17 Aug 2024 19:34:02 GMT' === order.dueAt && (
                //           <Button
                //             type='button'
                //             onClick={withdrawalHandler}
                //             disabled={clicked}
                //             variant='success'
                //           >
                //             {!clicked ? (
                //               'Withdraw'
                //             ) : isProcessing ? (
                //               <LoadingBox />
                //             ) : (
                //               'Submitted'
                //             )}
                //           </Button>
                //         )}
                //       </div>
                //     )}
                //   </div>
                // </MessageBox>
                <MessageBox variant='danger'>
                  <div className='iFlex'>
                    <p className='spacing0'>Not Due</p>
                  </div>
                </MessageBox>
              )}
            </Card.Body>
          </Card>

          {/* <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>Withdrawal Details</Card.Title>
              <Card.Text>
                <strong>Name: </strong> {order.bankDetails.fullName}
                <br />
                <strong>Bank: </strong> {order.bankDetails.bank},
                <br />
                <strong>Account Number: </strong> {order.bankDetails.accountNum}
              </Card.Text>
             
          
              {order.isDue ? (
                <MessageBox variant='success'>
                  <div className='iFlex'>
                  {order.isPaid ? (
                      <div>
                        <p className='spacing0'>Due</p>
                        <Button
                          type='button'
                          onClick={withdrawalHandler}
                          // disabled={!clicked}
                          variant='success'
                        >
                     
                          {!clicked ? 'Withdraw' : 'Processing' }
                        </Button>
                      </div>
                    ) : (
                      <p className='spacing0 green_1'>
                        {isProcessing ? (
                          <LoadingBox />
                        ) : (
                          <strong>
                            Withdrawal is being processed, please check your
                            account in One hour.
                          </strong>
                        )}
                      </p>
                    )}
                  </div>
              
                </MessageBox>
              ) : (
                <MessageBox variant='danger'>
                  {order.isPaid ? (
                    <div className='iFlex'>
                      <p className='spacing0'>
                        Due on <DueDate />
                      </p>
                    
                        <Button type='button' disabled variant='danger'>
                          Withdraw
                        </Button>
    
                    </div>
                  ) : (
                    <div className='iFlex'>
                      <p className='spacing0'>Not Due for withdrawal</p>
                    </div>
                  )}
                </MessageBox>
              )}
            </Card.Body>
          </Card> */}

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>Items</Card.Title>
              <ListGroup variant='flush'>
                {order.orderItems.map((item) => (
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
                            to={`/product/${item.slug}`}
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
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title className='green_1'>Investment Summary</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Amount</Col>
                    <Col>₦{order.itemsPrice.toLocaleString()}</Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>₦{order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item> */}
                {/* <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>₦0.00</Col>
                  </Row>
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <Row>
                    <Col>Interest</Col>
                    <Col>₦{order.taxPrice.toLocaleString()}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>₦{order.totalPrice.toLocaleString()}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
