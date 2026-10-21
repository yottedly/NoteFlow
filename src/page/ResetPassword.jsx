import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [sessionReady, setSessionReady] = useState(false)

useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setSessionReady(true)
      }
    }
  )

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      setSessionReady(true)
    }
  })

  return () => {
    authListener.subscription.unsubscribe()
  }
}, [])
  async function handleResetPassword(event) {
    event.preventDefault()
    setMessage('')
    if (password.length < 6) {
      setMessage('Your password must contain at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setMessage('Your passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })
      if (error) throw error
      setMessage('Password updated successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/auth')
      }, 2000)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#eeece5] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#53664b]">
          Reset your password
        </h1>
        <p className="mt-3 text-gray-600">
          Enter and confirm your new password for NoteFlow.
        </p>
        <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              New password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your new password"
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#53664b]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter your new password again"
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#53664b]"
            />
          </div>
          {message && (
            <p role="status" className="text-sm text-[#53664b]">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#53664b] px-6 py-3 font-semibold text-white transition hover:bg-[#40513a] disabled:opacity-50"
          >
            {loading ? 'Updating password...' : 'Update password'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link
            to="/auth"
            className="font-medium text-[#53664b] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
export default ResetPassword