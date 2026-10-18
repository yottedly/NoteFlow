import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { ArrowLeft, Mail, LockKeyhole, Sparkles } from 'lucide-react'

function Auth() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.session) {
          setMessage('Account created successfully! You can now log in.')
          setIsSignUp(false)
        } else {
          setMessage(
            'Account created! Check your email to confirm your account before logging in.'
          )
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        navigate ('/dashboard')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf7] px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#53664b]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="rounded-3xl border border-[#eeece5] bg-white p-8 shadow-xl shadow-gray-900/5 sm:p-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6eadf] text-[#53664b]">
            <Sparkles size={24} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            {isSignUp
              ? 'Create an account to start organising your thoughts.'
              : 'Log in to access your personal notes.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#718567]">
                <Mail size={18} className="text-gray-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-[#718567]">
                <LockKeyhole size={18} className="text-gray-400" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  minLength={6}
                  required
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />
              </div>

              {isSignUp && (
                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              )}
            </div>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-xl bg-[#f1f2eb] p-4 text-sm leading-6 text-[#53664b]"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#53664b] py-3.5 font-semibold text-white transition hover:bg-[#40513a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Please wait...'
                : isSignUp
                  ? 'Create account'
                  : 'Log in'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isSignUp
              ? 'Already have an account?'
              : "Don't have an account yet?"}

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setMessage('')
              }}
              className="ml-1 font-semibold text-[#53664b] hover:underline"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Your thoughts, organised in one place.
        </p>
      </div>
    </div>
  )
}

export default Auth