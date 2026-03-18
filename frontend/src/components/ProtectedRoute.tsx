// src/components/ProtectedRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Props = {
  children: React.ReactElement
}

/**
 * ProtectedRoute - wraps pages that require authentication.
 * If user is not signed in, redirects to /signin.
 * Shows a simple loading placeholder while auth initialization occurs.
 */
export default function ProtectedRoute({ children }: Props) {
  const { user, token, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-sm text-slate-500">Checking authentication…</div>
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  // token exists (mock) — allow access
  return children
}
