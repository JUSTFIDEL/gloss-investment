import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { StoreContext } from '../contexts/StoreContext'

export default function ProtectedRoute({ children }) {
	const { state } = useContext(StoreContext)
	const { userInfo } = state
	return userInfo ? children : <Navigate to='/signin' />
}
