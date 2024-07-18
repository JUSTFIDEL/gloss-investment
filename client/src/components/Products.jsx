import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import authFetch from '../axios/custom'
import { StoreContext } from '../contexts/StoreContext'
import { toast } from 'react-toastify'
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'

const Products = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(StoreContext)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
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

  return (
    <div key={product.slug} className='product'>
      <Link to={`/product/${product.slug}`}>
        <img alt={product.name} src={product.image} />
      </Link>
      <div className='product-info'>
        <Link to={`/product/${product._slug}`}>
          <p className='p-name'>{product.name} Package</p>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
          description={product.description}
        />
        <p className='p-price'>₦{product.price.toLocaleString()}</p>
        {/* <p className='p-price'>₦{product.price}.toLocaleString()</p> */}
        {product.countInStock === 0 ? (
          <button className='pro-but-0' disabled>
            Out of Stock
          </button>
        ) : (
          <button onClick={() => addToCartHandler(product)} className='pro-but'>
            Select
          </button>
        )}
      </div>
    </div>
  )

  // return (
  // 	<Card className='prod_card'>
  // 		<Link to={`/product/${product._id}`}>
  // 			<img src={product.image} alt={product.name} className='card-img-top' />
  // 		</Link>
  // 		<Card.Body className='product-info'>
  // 			<Link to={`/product/${product._id}`}>
  // 				<Card.Title className='c_tit'>{product.name} Package</Card.Title>
  // 			</Link>
  // 			<Rating rating={product.rating} numReviews={product.numReviews} />
  // 			<Card.Text>₦{product.price}</Card.Text>
  // 			{product.countInStock === 0 ? (
  // 				<Button variant='outline-secondary' disabled>
  // 					Out of stock
  // 				</Button>
  // 			) : (
  // 				<Button variant='success' onClick={() => addToCartHandler(product)}>
  // 					Select
  // 				</Button>
  // 			)}
  // 		</Card.Body>
  // 	</Card>
  // )
}

export default Products
