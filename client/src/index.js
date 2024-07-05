import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import StoreContextProvider from './contexts/StoreContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js/dist/cjs/react-paypal-js.min'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <StoreContextProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreContextProvider>
  </StrictMode>
)
