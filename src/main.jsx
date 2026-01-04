import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.Fragment>,
)
