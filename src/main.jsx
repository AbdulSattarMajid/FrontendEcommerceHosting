import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './Components/cartComponents/CartContext.jsx';
import {SearchProvider} from './Components/context/SearchProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1048941120723-hqea1jlihhdnenp8fdhj9783u7j19rmr.apps.googleusercontent.com">
    <SearchProvider>  <CartProvider>   <App /></CartProvider></SearchProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
