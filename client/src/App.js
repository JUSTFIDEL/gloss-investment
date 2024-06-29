import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Footer from './screen/Components/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen'
import { useContext, useEffect, useState } from 'react'
import { Store } from './Store'
import CartScreen from './screen/CartScreen'
import SigninScreen from './screen/SigninScreen'
import { LinkContainer } from 'react-router-bootstrap'
import ShippingAddressScreen from './screen/ShippingAddressScreen'
import SignupScreen from './screen/SignupScreen'
import Container from 'react-bootstrap/Container'
import PaymentMethodScreen from './screen/PaymentMethodScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import OrderScreen from './screen/OrderScreen'
import OrderHistoryScreen from './screen/OrderHistoryScreen'
import ProfileScreen from './screen/ProfileScreen'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getError } from './utils'
import SearchBox from './screen/Components/SearchBox'
import SearchScreen from './screen/SearchScreen'
import ProtectedRoute from './screen/Components/ProtectedRoute'
import DashboardScreen from './screen/DashboardScreen'
import AdminRoute from './screen/Components/AdminRoute'

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store)
	const { cart, userInfo } = state

	const signOutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' })
		localStorage.removeItem('userInfo')
		localStorage.removeItem('shippingAddress')
		localStorage.removeItem('paymentMethod')
		window.location.href = '/signin'
	}

	const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const { data } = await axios.get(`/api/products/categories`)
				setCategories(data)
			} catch (err) {
				toast.error(getError(err))
			}
		}
		fetchCategories()
	}, [])

	return (
		<BrowserRouter>
			<div
				className={
					sidebarIsOpen
						? 'd-flex flex-column site-container active-cont'
						: 'd-flex flex-column site-container'
				}>
				<ToastContainer position="bottom-center" limit={1} />
				<header>
					<Navbar variant="dark my-nav" expand="lg">
						<Container className="top-nav">
							<Button
								className="nav-btn"
								variant="dark"
								onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
								<i className="fas fa-bars"></i>
							</Button>
							<div>
								<Link to="/">
									<img
										src="../images/logo.svg"
										className="logo"
										alt="logo"
									/>
								</Link>
							</div>
							<div className="nav-top-right">
								<Navbar.Toggle arial-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<SearchBox />
									<Nav className="me-auto w-100 justify-content-end">
										<Link to="/cart" className="nav-link">
											<strong>Cart</strong>
											{cart.cartItems.length > 0 && (
												<Badge pill bg="danger">
													{cart.cartItems.reduce(
														(a, c) => a + c.quantity,
														0,
													)}
												</Badge>
											)}
										</Link>
										{userInfo ? (
											<NavDropdown
												title={userInfo.name}
												id="basic-nav-dropdown">
												<LinkContainer to="/profile">
													<NavDropdown.Item>
														User Profile
													</NavDropdown.Item>
												</LinkContainer>
												<LinkContainer to="/orderhistory">
													<NavDropdown.Item>
														Order History
													</NavDropdown.Item>
												</LinkContainer>
												<NavDropdown.Divider />
												<Link
													className="dropdown-item"
													to="#signout"
													onClick={signOutHandler}>
													Sign Out
												</Link>
											</NavDropdown>
										) : (
											<Link className="nav-link" to="/signin">
												Sign In
											</Link>
										)}
										{userInfo && userInfo.isAdmin && (
											<NavDropdown
												title="Admin"
												id="admin-nav-dropdown">
												<LinkContainer to="/admin/dashboard">
													<NavDropdown.Item>
														Dashboard
													</NavDropdown.Item>
												</LinkContainer>
												<LinkContainer to="/admin/productlist">
													<NavDropdown.Item>
														Products
													</NavDropdown.Item>
												</LinkContainer>
												<LinkContainer to="/admin/orderlist">
													<NavDropdown.Item>
														Orders
													</NavDropdown.Item>
												</LinkContainer>
												<LinkContainer to="/admin/userlist">
													<NavDropdown.Item>
														Users
													</NavDropdown.Item>
												</LinkContainer>
											</NavDropdown>
										)}
									</Nav>
								</Navbar.Collapse>
							</div>
						</Container>
					</Navbar>
				</header>

				<div
					className={
						sidebarIsOpen
							? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column  link-pad'
							: 'side-navbar d-flex justify-content-between flex-wrap flex-column'
					}>
					<Nav className="flex-column text-white w-100 p-2">
						<Nav.Item>
							<strong>Categories</strong>
						</Nav.Item>
						{categories.map(category => (
							<Nav.Item key={category}>
								<Link
									className="side-nav"
									to={`/search?category=${category}`}
									onClick={() => setSidebarIsOpen(false)}>
									<p className="pl-10 pt-10">{category}</p>
								</Link>
							</Nav.Item>
						))}
					</Nav>
				</div>

				<main className="scr-pad">
					<Routes>
						<Route path="/product/:slug" element={<ProductScreen />} />
						<Route path="/cart" element={<CartScreen />} />
						<Route path="/search" element={<SearchScreen />} />
						<Route path="/signin" element={<SigninScreen />} />
						<Route path="/signup" element={<SignupScreen />} />
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<ProfileScreen />
								</ProtectedRoute>
							}
						/>
						<Route path="/placeorder" element={<PlaceOrderScreen />} />
						<Route
							path="/order/:id"
							element={
								<ProtectedRoute>
									<OrderScreen />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orderhistory"
							element={
								<ProtectedRoute>
									<OrderHistoryScreen />
								</ProtectedRoute>
							}
						/>
						<Route path="/shipping" element={<ShippingAddressScreen />} />
						<Route path="/payment" element={<PaymentMethodScreen />} />
						{/* AdminRoutes */}
						<Route
							path="/admin/dashboard"
							element={
								<AdminRoute>
									<DashboardScreen />
								</AdminRoute>
							}
						/>
						<Route path="/" element={<HomeScreen />} />
					</Routes>
				</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</BrowserRouter>
	)
}

export default App
