// src/pages/Signup.tsx
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/AuthContext'

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 chars').required('Required'),
})

export default function Signup() {
  const { signup } = useAuth()

  return (
    <div className="container-max py-16">
      <div className="max-w-2xl mx-auto glass rounded-xl p-8 shadow">
        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">Create your account</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          Get started with Skill-Link — create a free account to try the demo.
        </p>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting, setFieldError, setStatus }) => {
            setStatus(null)
            try {
              await signup(values.name, values.email, values.password)
              // AuthContext redirects on success
            } catch (err: any) {
              // prefer backend message if available
              const msg = err?.response?.data?.error || err?.message || 'Signup failed'
              // if it's an "already exists" style error, attach to email, otherwise set status
              if (msg.toLowerCase().includes('exists') || msg.toLowerCase().includes('email')) {
                setFieldError('email', msg)
              } else {
                setStatus(msg)
              }
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {/* global status */}
              {status ? (
                <div className="text-sm text-red-400 bg-red-900/10 p-2 rounded">{status}</div>
              ) : null}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Full name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Your name"
                  aria-label="Full name"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-white/95 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-white/95 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  aria-label="Password"
                  className="mt-1 w-full rounded-md border px-3 py-2 bg-white/95 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white transition ${
                    isSubmitting ? 'opacity-60 pointer-events-none' : 'shadow-lg'
                  } bg-gradient-to-r from-primary-500 to-accent-400`}
                >
                  {isSubmitting ? 'Creating...' : 'Create account'}
                </button>

                <a
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-white/10 dark:bg-white/5 text-slate-900 dark:text-slate-200 border border-white/10"
                  href="/signin"
                >
                  Already have an account?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
