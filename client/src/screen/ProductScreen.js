import axios from 'axios'
import { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { Store } from '../Store'
import { getError } from '../utils'
import LoadingBox from './Components/LoadingBox'
import MessageBox from './Components/MessageBox'
import Rating from './Components/Rating'

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true }
		case 'FETCH_SUCCESS':
			return { ...state, product: action.payload, loading: false }
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}

function ProductScreen() {
	const navigate = useNavigate()
	const params = useParams()
	const { slug } = params

	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		product: [],
		loading: true,
		error: '',
	})

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'FETCH_REQUEST' })
			try {
				const result = await axios.get(`/api/products/slug/${slug}`)
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
			}
		}
		fetchData()
	}, [slug])

	const { state, dispatch: ctxDispatch } = useContext(Store)
	const { cart } = state
	const addToCartHandler = async () => {
		const existItem = cart.cartItems.find(x => x._id === product._id)
		const quantity = existItem ? existItem.quantity + 1 : 1
		const { data } = await axios.get(`/api/products/${product._id}`)
		if (data.countInStock < quantity) {
			window.alert('Sorry. Product is Out of Stock')
			return
		}
		ctxDispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		})
		navigate('/cart')
	}

	return loading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div className="prod-flex">
			<div>
				<img alt={product.name} src={product.image} />
			</div>
			<div className="prod-details">
				<Helmet>
					<title>{product.name}</title>
				</Helmet>
				<h1>{product.name}</h1>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<hr />
				<strong>Price:</strong> N{product.price}
				<hr />
				<h2>Description:</h2>
				<p>{product.description}</p>
			</div>
			<div className="prod-price">
				<p>
					<strong>Price: </strong> N{product.price}
				</p>
				<hr />
				<p>
					<strong>Status: </strong>
					{product.countInStock > 0 ? (
						<span className="av-status"> In Stock</span>
					) : (
						<span className="uav-status"> Unavailable</span>
					)}
				</p>
				<hr />
				{product.countInStock > 0 && (
					<button onClick={addToCartHandler} className="pro-but-1">
						Add to Cart
					</button>
				)}
			</div>
		</div>
	)
}

export default ProductScreen
