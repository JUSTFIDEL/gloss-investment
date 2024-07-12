import React, { useContext } from 'react'
import { StoreContext } from '../contexts/StoreContext'
import { Helmet } from 'react-helmet-async'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link, useNavigate } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import MessageBox from '../components/MessageBox'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import authFetch from '../axios/custom'
import { toast } from 'react-toastify'

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const {
    cart: { cartItems },
  } = state

  const navigate = useNavigate()

  const updateCartHandler = async (item, quantity) => {
    const url = `/api/products/${item._id}`
    const { data } = await authFetch(url)

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
      payload: { ...item, quantity },
    })
  }

  const removeItemHandler = async (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { ...item },
    })
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Investment Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty.{' '}
              <Link to='/' className='green_1'>
                Choose portfolio here
              </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-item-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded img-thumbnail'
                      ></img>{' '}
                      <Link to={`/product/${item._id}`}>
                        <span className='s-text'>{item.name}</span>
                      </Link>
                    </Col>
                    <Col md={3} className='center'>
                      <Button
                        variant='light'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className='fa-solid fa-minus-circle'></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant='light'
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className='fa-solid fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3} className='center'>
                      ₦{item.price}
                    </Col>
                    <Col md={2} className='center'>
                      <Button
                        variant='light'
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className='fa-solid fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Amount ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    Package) : ₦
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      variant='success'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen
