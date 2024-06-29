import axios from 'axios'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'
import Rating from './Rating'

function Product(props) {
	const { product } = props

	const { state, dispatch: ctxDispatch } = useContext(Store)
	const {
		cart: { cartItems },
	} = state

	const addToCartHandler = async item => {
		const existItem = cartItems.find(x => x._id === product._id)
		const quantity = existItem ? existItem.quantity + 1 : 1
		const { data } = await axios.get(`/api/products/${item._id}`)
		if (data.countInStock < quantity) {
			window.alert('Sorry. Product is Out of Stock')
			return
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...item, quantity },
		})
	}

	return (
		<div key={product.slug} className="product">
			<Link to={`/product/${product.slug}`}>
				<img alt={product.name} src={product.image} />
			</Link>
			<div className="product-info">
				<Link to={`/product/${product.slug}`}>
					<p className="p-name">{product.name}</p>
				</Link>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<p className="p-price">N{product.price}</p>
				{product.countInStock === 0 ? (
					<button className="pro-but-0" disabled>
						Out of Stock
					</button>
				) : (
					<button
						onClick={() => addToCartHandler(product)}
						className="pro-but">
						Add to cart
					</button>
				)}
			</div>
		</div>
	)
}

export default Product
