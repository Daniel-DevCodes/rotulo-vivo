import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'  // <-- Deve apontar para App.jsx, não AppDebug.jsx
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)