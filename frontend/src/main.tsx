import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import axios from "axios"
import { AuthProvider } from "./contexts/AuthContext"

// ✅ IMPORTANT: backend base URL
axios.defaults.baseURL = "http://127.0.0.1:8000"
axios.defaults.headers.post["Content-Type"] = "application/json"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
