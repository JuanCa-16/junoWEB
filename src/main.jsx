import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './estilos/i2.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>,
)
