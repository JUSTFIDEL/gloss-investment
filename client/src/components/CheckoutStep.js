import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Row className='checkout-steps'>
      <Col className={step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={step2 ? 'active' : ''}>Bank Details</Col>
      <Col className={step3 ? 'active' : ''}>Payment</Col>
      <Col className={step4 ? 'active' : ''}>Make Payment </Col>
    </Row>
  )
}

export default CheckoutStep
