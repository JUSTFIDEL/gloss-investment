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
    cart: { bankDetails, paymentMethod },
  } = state
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Transfer'
  )

  useEffect(() => {
    if (!bankDetails.bank) {
      navigate('/bank')
    }
  }, [navigate, bankDetails])

  const submitHandler = (e) => {
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
        <h1 className='my-3 green_1'>Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Transfer'
              label='Transfer'
              value='Transfer'
              checked={paymentMethodName === 'Transfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <Form.Check
              type='radio'
              id='Bank Deposit'
              label='Bank Deposit'
              value='Bank Deposit'
              checked={paymentMethodName === 'Bank Deposit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          {/* <div className='mb-3'>
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
					</div> */}

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
