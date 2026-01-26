import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

import { AuthProvider } from './contexts/AuthContext';

// Handle chunk loading errors
window.addEventListener('error', (e) => {
  if (e.message.includes('Loading chunk') || e.message.includes('Unexpected token <')) {
    console.warn('Chunk loading failed. Reloading page...');
    window.location.reload();
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.Fragment>,
);
