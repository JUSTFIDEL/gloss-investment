import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'
import { StoreContext } from '../contexts/StoreContext'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'

const BankDetailsScreen = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(StoreContext)
  const {
    userInfo,
    cart: { bankDetails },
  } = state

  const [fullName, setFullName] = useState(bankDetails.fullName || '')
  const [bank, setBank] = useState(bankDetails.bank || '')
  const [accountNum, setAccountNum] = useState(bankDetails.accountNum || '')
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  // const [country, setCountry] = useState(shippingAddress.country || '')

  // const [fullName, setFullName] = useState(shippingAddress.fullName || '')
  // const [address, setAddress] = useState(shippingAddress.address || '')
  // const [city, setCity] = useState(shippingAddress.city || '')
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  // const [country, setCountry] = useState(shippingAddress.country || '')

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/bank')
    }
  }, [userInfo, navigate])

  const submitHandler = (e) => {
    dispatch({
      type: 'SAVE_BANK_DETAILS',
      payload: {
        fullName,
        bank,
        accountNum,

        // fullName,
        // address,
        // city,
        // postalCode,
        // country,
      },
    })

    localStorage.setItem(
      'bankDetails',
      JSON.stringify({
        fullName,
        bank,
        accountNum,

        // fullName,
        // address,
        // city,
        // postalCode,
        // country,
      })
    )

    navigate('/payment')
  }

  return (
    <div>
      <Helmet>
        <title>Bank Details</title>
      </Helmet>
      <CheckoutStep step1 step2 />
      <div className='container small-container'>
        <h1 className='my-3 green_1'>Bank Details</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Bank</Form.Label>
            <Form.Control
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              value={accountNum}
              onChange={(e) => setAccountNum(e.target.value)}
              required
            />
            <p className='red'>
              Fill in your bank details for withdrawal, it can't be changed
              without admin's permission.
            </p>
          </Form.Group>
          {/* <Form.Group className='mb-3' controlId='postalCode'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
							required
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='country'>
						<Form.Label>Country</Form.Label>
						<Form.Control
							value={country}
							onChange={e => setCountry(e.target.value)}
							required
						/>
					</Form.Group> */}
          <div className='mb-3'>
            <Button variant='success' type='submit'>
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default BankDetailsScreen
