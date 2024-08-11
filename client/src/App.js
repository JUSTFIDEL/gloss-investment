import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Container from 'react-bootstrap/Container'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
// import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import { LinkContainer } from 'react-router-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from './contexts/StoreContext'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import BankDetailsScreen from './screens/BankDetailsScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import SearchScreen from './screens/SearchScreen'
import { getError } from './utils'
import authFetch from './axios/custom'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardScreen from './screens/DashboardScreen'
import AdminRoute from './components/AdminRoute'
import AdminProductScreen from './screens/AdminProductScreen'
import AdminOrdersScreen from './screens/AdminOrderScreen'
import UsersScreen from './screens/UsersScreen'
import ReferralScreen from './screens/ReferralScreen'
// import ShippingAddressScreen from './screens/BankDetailsScreen'
// import SearchBox from './components/SearchBox'
// import Button from 'react-bootstrap/Button'

function App() {
  const { state, dispatch } = useContext(StoreContext)
  const { cart, userInfo } = state

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('bankDetails')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await authFetch(`/api/products/categories`)
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
          sidebarIsOpen ? 'site-container active-cont' : 'site-container'
        }
      >
        <ToastContainer position='top-center' limit={1} />
        <div className='lg-prof'>
          <header>
            {/* <Button
              variant='success'
              className='dis_none'
              onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            >
              <i className='fas fa-bars'></i>
            </Button> */}
            <img src='/images/naira01.png' alt='logo' className='logo_img2' />
            <div className='nav_logo'>
              <Link to='/' className='logo_cont'>
                <img
                  src='/images/gross01.png'
                  alt='logo'
                  className='logo_img'
                />
                {/* <p className='logo_text dis_none'>Gross Investment</p> */}
              </Link>
              {/* <SearchBox /> */}
            </div>

            <div className='nav_profile'>
              <Link to='/cart' className='nav-link'>
                <i className='fa-solid fa-briefcase fa-beat i-color'>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </i>
              </Link>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='basic-nav-dropdown'
                  className='user_pro'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='sm-font'>
                      User Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item className='sm-font'>
                      Order History
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/referrals'>
                    <NavDropdown.Item className='sm-font'>
                      Referrals
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <Link
                    className='dropdown-item sm-font'
                    to='#signout'
                    onClick={signoutHandler}
                  >
                    Sign Out{' '}
                  </Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to='/signin'>
                  Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title='Admin'
                  id='admin-nav-dropdown'
                  className='dis_none'
                >
                  <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item className='sm-font'>
                      Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className='sm-font'>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className='sm-font'>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item className='sm-font'>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </div>
          </header>
        </div>

        <div className='sm-prof'>
          <header>
            <div className='nav_logo'>
              <img src='/images/naira01.png' alt='logo' className='logo_img1' />
              <Link to='/' className='logo_cont'>
                <img
                  src='/images/gross_mobile.png'
                  alt='logo'
                  className='logo_img'
                />
              </Link>
            </div>

            <div className='nav_profile'>
              <Link to='/cart' className='nav-link'>
                <i className='fa-solid fa-briefcase fa-beat i-color'>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </i>
              </Link>

              {/* {userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='basic-nav-dropdown'
									className='user_pro'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item className='sm-font'>
											User Profile
										</NavDropdown.Item>
									</LinkContainer>

									<LinkContainer to='/orderhistory'>
										<NavDropdown.Item className='sm-font'>
											Order History
										</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Divider />

									<Link
										className='dropdown-item sm-font'
										to='#signout'
										onClick={signoutHandler}
									>
										Sign Out{' '}
									</Link>
								</NavDropdown>
							) : (
								<Link className='nav-link' to='/signin'>
									Sign In
								</Link>
							)} */}

              {userInfo && userInfo.isAdmin ? (
                <NavDropdown
                  title='Admin'
                  id='admin-nav-dropdown'
                  // className='dis_none'
                >
                  <LinkContainer to='/admin/dashboard'>
                    <NavDropdown.Item className='sm-font'>
                      Dashboard
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className='sm-font'>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className='sm-font'>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item className='sm-font'>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='sm-font'>
                      User Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item className='sm-font'>
                      Order History
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <Link
                    className='dropdown-item sm-font'
                    to='#signout'
                    onClick={signoutHandler}
                  >
                    Sign Out{' '}
                  </Link>
                </NavDropdown>
              ) : userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='basic-nav-dropdown'
                  className='user_pro'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='sm-font'>
                      User Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item className='sm-font'>
                      Order History
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/referrals'>
                    <NavDropdown.Item className='sm-font'>
                      Referrals
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <Link
                    className='dropdown-item sm-font'
                    to='#signout'
                    onClick={signoutHandler}
                  >
                    Sign Out{' '}
                  </Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to='/signin'>
                  Sign In
                </Link>
              )}
            </div>
          </header>
        </div>

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column dis_none'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column dis_none'
          }
        >
          <Nav className='flex-column text-white w-100 p-2 dis_none'>
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    hash: '#hash',
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        <main className='pt-3'>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            {/* Admin Routes */}
            <Route
              path='/admin/dashboard'
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/admin/productlist'
              element={
                <AdminRoute>
                  <AdminProductScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/admin/orderlist'
              element={
                <AdminRoute>
                  <AdminOrdersScreen />
                </AdminRoute>
              }
            />
            <Route
              path='/admin/userlist'
              element={
                <AdminRoute>
                  <UsersScreen />
                </AdminRoute>
              }
            />
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path='/bank' element={<BankDetailsScreen />} />
            <Route path='/payment' element={<PaymentMethodScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route
              path='/order/:id'
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/orderhistory'
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path='/referrals/:phone'
              element={
                <ProtectedRoute>
                  <ReferralScreen />
                </ProtectedRoute>
              }
            />
            <Route path='/search' element={<SearchScreen />} />
          </Routes>
        </main>

        <footer>
          <div className='mt11 mt10'>{`All rights reserved - Gross Inv. ©${new Date().getFullYear()}`}</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
