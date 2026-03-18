import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 🔐 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

import { HistoryItem } from "../types"

/* ===== API FUNCTIONS ===== */

export const getHistory = async (): Promise<HistoryItem[]> => {
  const res = await api.get("/api/history")
  return res.data
}

export default api