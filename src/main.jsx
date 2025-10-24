import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";  // 🔹 importa el router
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* 🔹 envuelve tu App aquí */}
    <App />
    </BrowserRouter>
  </StrictMode>,
)
