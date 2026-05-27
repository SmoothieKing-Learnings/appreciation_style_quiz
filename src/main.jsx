import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initAxe } from './skills/a11yUtils.js'

// Initialize axe in dev environment
if (import.meta.env.DEV) {
  initAxe(React, ReactDOM);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
