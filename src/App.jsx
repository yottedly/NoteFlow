import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Auth from './page/Auth'
import Dashboard from './page/Dashboard'
import {
  ArrowRight,
  Check,
  FileText,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#fafaf7] text-gray-900">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a href="#" className="text-2xl font-bold text-[#53664b]">
          NoteFlow
        </a>

        <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          <a href="#features" className="transition hover:text-[#53664b]">
            Features
          </a>
          <a href="#about" className="transition hover:text-[#53664b]">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
  to="/auth"
  className="hidden px-4 py-2 text-sm font-medium transition hover:text-[#53664b] sm:block"
>
  Log in
</Link>
          <Link
  to="/auth"
  className="rounded-full bg-[#53664b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#40513a]"
>
  Get started <ArrowRight className="ml-1 inline" size={16} />
</Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:py-24 lg:grid-cols-2 lg:px-12">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dfe4d9] bg-white px-4 py-2 text-sm text-[#53664b]">
              <Sparkles size={16} />
              A calmer way to organise your thoughts
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Your thoughts,
              <span className="block text-[#718567]"> beautifully</span>
              organised.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Capture your ideas, organise your notes, and keep everything that
              matters in one simple, peaceful space.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
  to="/auth"
  className="rounded-full bg-[#53664b] px-7 py-4 font-semibold text-white shadow-lg shadow-[#53664b]/15 transition hover:-translate-y-0.5 hover:bg-[#40513a]"
>
  Start taking notes <ArrowRight className="ml-2 inline" size={18} />
</Link>

              <a
                href="#features"
                className="rounded-full border border-gray-200 bg-white px-7 py-4 font-semibold transition hover:border-[#53664b]"
              >
                Explore features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#53664b]" />
                Simple to use
              </span>
              <span className="flex items-center gap-2">
                <Check size={16} className="text-[#53664b]" />
                Your notes, your space
              </span>
            </div>
          </div>

          {/* Preview card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#e6eadf] blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-[#f0e5d5] blur-2xl" />

            <div className="relative rotate-1 rounded-3xl border border-[#e9e7df] bg-white p-5 shadow-2xl shadow-gray-900/5 sm:p-7">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                    My workspace
                  </p>
                  <h2 className="mt-1 text-xl font-bold">Recent notes</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1e9] text-[#53664b]">
                  <FileText size={20} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-[#f5f6f1] p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e1e8d9] px-3 py-1 text-xs font-medium text-[#53664b]">
                      Ideas
                    </span>
                    <span className="text-xs text-gray-400">Today</span>
                  </div>
                  <h3 className="mt-3 font-semibold">Ideas worth exploring</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    A little space for the big things on my mind...
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#f6ebdb] px-3 py-1 text-xs font-medium text-[#92734b]">
                      Personal
                    </span>
                    <span className="text-xs text-gray-400">Yesterday</span>
                  </div>
                  <h3 className="mt-3 font-semibold">Weekly reflections</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Things I learned and moments I want to remember.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e9e7f6] px-3 py-1 text-xs font-medium text-[#7565a5]">
                      Study
                    </span>
                    <span className="text-xs text-gray-400">Monday</span>
                  </div>
                  <h3 className="mt-3 font-semibold">Things to revise</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Important concepts for the next study session.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#53664b] p-4 text-white">
                <LockKeyhole size={19} />
                <div>
                  <p className="text-sm font-semibold">Your personal space</p>
                  <p className="mt-0.5 text-xs text-white/75">
                    Designed to keep your notes organised
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-t border-[#eeece5] bg-white px-6 py-20 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#718567]">
                Everything in its place
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Less clutter. More clarity.
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                Keep your ideas organised without making things complicated.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<FileText size={23} />}
                title="Capture your ideas"
                description="Write down thoughts, lecture notes, reminders, and anything you want to remember."
              />
              <FeatureCard
                icon={<Sparkles size={23} />}
                title="Stay organised"
                description="Give your notes clear titles and keep your personal workspace tidy."
              />
              <FeatureCard
                icon={<LockKeyhole size={23} />}
                title="Keep notes private"
                description="Sign in to access your own workspace, with access controls protecting your notes."
              />
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section id="about" className="bg-[#f1f2eb] px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Make room for your next big idea.
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Start with a thought. Build a habit. Let NoteFlow keep everything
              together.
            </p>
            <Link
  to="/auth"
  className="mt-8 inline-block rounded-full bg-[#53664b] px-7 py-4 font-semibold text-white transition hover:bg-[#40513a]"
>
  Get started <ArrowRight className="ml-2 inline" size={18} />
</Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
          <span className="font-bold text-[#53664b]">NoteFlow</span>
          <span>Make space for your thoughts.</span>
          <span>© 2026 NoteFlow</span>
        </div>
      </footer>
    </div>
          }
        />

        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-[#eeece5] bg-[#fafaf7] p-6">
      <div className="mb-4 inline-flex rounded-xl bg-[#e6eadf] p-3 text-[#53664b]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 leading-7 text-gray-600">{description}</p>
    </div>
  );
}

export default App;
