import React, { useEffect, useReducer } from 'react'
import authFetch from '../axios/custom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Products from '../components/Products'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'

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
		<div>
			<Helmet>
				<title>JustFidel</title>
			</Helmet>
			<h1 className='text-center'>Featured Products</h1>
			<div className='products'>
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant='danger'>{error}</MessageBox>
				) : (
					<Row>
						{products.map(product => (
							<Col
								key={product._id}
								sm={6}
								md={4}
								lg={3}
								className='mb-3'
							>
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
