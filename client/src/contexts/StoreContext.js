import { createContext, useReducer } from 'react'

export const StoreContext = createContext()

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    bankDetails: localStorage.getItem('bankDetails')
      ? JSON.parse(localStorage.getItem('bankDetails'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    // paidAt: localStorage.getItem('paidAt')
    //   ? localStorage.getItem('paidAt')
    //   : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]

      localStorage.setItem('cartItems', JSON.stringify(cartItems))

      return { ...state, cart: { ...state.cart, cartItems } }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      )
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case 'CART_CLEAR': {
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    }

    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload }
    }

    case 'USER_SIGNOUT': {
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], bankDetails: {}, paymentMethod: '' },
      }
    }

    case 'SAVE_BANK_DETAILS': {
      return {
        ...state,
        cart: { ...state.cart, bankDetails: action.payload },
      }
    }

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      }

    default:
      return state
  }
}

function StoreContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export default StoreContextProvider
