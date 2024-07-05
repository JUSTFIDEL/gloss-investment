import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../contexts/StoreContext'
import CheckoutStep from '../components/CheckoutStep'

export default function PaymentMethodScreen() {
	const navigate = useNavigate()
	const { state, dispatch: ctxDispatch } = useContext(StoreContext)
	const {
		cart: { shippingAddress, paymentMethod },
	} = state
	const [paymentMethodName, setPaymentMethod] = useState(
		paymentMethod || 'PayPal',
	)

	useEffect(() => {
		if (!shippingAddress.address) {
			navigate('/shipping')
		}
	}, [navigate, shippingAddress])

	const submitHandler = e => {
		e.preventDefault()

		ctxDispatch({
			type: 'SAVE_PAYMENT_METHOD',
			payload: paymentMethodName,
		})

		localStorage.setItem('paymentMethod', paymentMethodName)
		navigate('/placeorder')
	}

	return (
		<div>
			<CheckoutStep step1 step2 step3></CheckoutStep>
			<div className='container small-container'>
				<Helmet>
					<title>Payment Method</title>
				</Helmet>
				<h1 className='my-3'>Payment Method</h1>

				<Form onSubmit={submitHandler}>
					<div className='mb-3'>
						<Form.Check
							type='radio'
							id='PayPal'
							label='PayPal'
							value='PayPal'
							checked={paymentMethodName === 'PayPal'}
							onChange={e => setPaymentMethod(e.target.value)}
						/>
					</div>

					<div className='mb-3'>
						<Form.Check
							type='radio'
							id='Stripe'
							label='Stripe'
							value='Stripe'
							checked={paymentMethodName === 'Stripe'}
							onChange={e => setPaymentMethod(e.target.value)}
						/>
					</div>

					<div className='mb-3'>
						<Button type='submit' className='signing-btn' variant='success'>
							Continue
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}
