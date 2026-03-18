// src/pages/Signin.tsx
import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "../contexts/AuthContext"

const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().required("Required"),
})

export default function Signin() {
  const { signin } = useAuth()

  return (
    <div className="container-max py-16">
      <div className="max-w-md mx-auto bg-white/60 dark:bg-black/40 glass rounded-xl p-8 shadow-xl border border-white/10">

        <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
          Sign in
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
          Use the demo account or create a new one.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SigninSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await signin(values.email, values.password)
            } catch (err: any) {
              const msg =
                err?.response?.data?.error || "Signin failed"
              setFieldError("email", msg)
            } finally {
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>

                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="
                    mt-1 w-full rounded-md px-3 py-2
                    bg-white dark:bg-slate-900
                    text-slate-900 dark:text-slate-100
                    border border-slate-300 dark:border-slate-700
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  "
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Password
                </label>

                <Field
                  name="password"
                  type="password"
                  className="
                    mt-1 w-full rounded-md px-3 py-2
                    bg-white dark:bg-slate-900
                    text-slate-900 dark:text-slate-100
                    border border-slate-300 dark:border-slate-700
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                  "
                />

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>

                <a className="btn-ghost" href="/signup">
                  Create an account
                </a>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}