import { useEffect, useState } from 'react'
import {
FileText,
Plus,
LogOut,
Search,
Sparkles,
Trash2,
Pencil
} from 'lucide-react'
import { supabase } from '../supabaseClient'

function Dashboard() {
const [notes, setNotes] = useState([])
const [loading, setLoading] = useState(true)
const [showForm, setShowForm] = useState(false)
const [title, setTitle] = useState('')
const [content, setContent] = useState('')
const [editingNoteId, setEditingNoteId] = useState(null)
const [searchQuery, setSearchQuery] = useState('')
console.log('Search query: ', searchQuery)
const filteredNotes = notes.filter((note) => {
const query = searchQuery.trim().toLowerCase()
return (
  note.title.toLowerCase().includes(query) ||
  note.content.toLowerCase().includes(query)
)
})
async function handleLogout() {
const { error } = await supabase.auth.signOut()

if (error) {
alert('Failed to log out. Please try again.')
return
}

window.location.href = '/auth'
}

useEffect(() => {
async function fetchNotes() {
const { data: { session }, error: sessionError } =
await supabase.auth.getSession()

if (sessionError || !session) {
  window.location.href = '/auth'
  return
}
const { data, error } = await supabase
  .from('notes')
  .select('*')
  .order('created_at', { ascending: false })
if (error) {
  console.error('Error fetching notes:', error.message)
  setLoading(false)
  return
}
setNotes(data)
setLoading(false)

}

fetchNotes()
}, [])
useEffect(() => {
async function fetchNotes() {
const { data: { session }, error: sessionError } =
await supabase.auth.getSession()

if (sessionError || !session) {
  window.location.href = '/auth'
  return
}
const { data, error } = await supabase
  .from('notes')
  .select('*')
  .order('created_at', { ascending: false })
if (error) {
  console.error('Error fetching notes:', error.message)
  setLoading(false)
  return
}
setNotes(data)
setLoading(false)

}

fetchNotes()
}, [])

function handleEditNote(note) {
  setEditingNoteId(note.id)
  setTitle(note.title)
  setContent(note.content)
  setShowForm(true)
}
async function handleSaveNote() {
const trimmedTitle = title.trim()

if (!trimmedTitle) {
alert('Please enter a note title.')
return
}

const {
data: { user },
error: userError,
} = await supabase.auth.getUser()

if (userError || !user) {
alert('Please log in again before saving your note.')
return
}

if (editingNoteId) {
// Update an existing note
const { data, error } = await supabase
.from('notes')
.update({
title: trimmedTitle,
content: content.trim(),
updated_at: new Date().toISOString(),
})
.eq('id', editingNoteId)
.eq('user_id', user.id)
.select()
.single()

if (error) {
  console.error('Error updating note:', error.message)
  alert('Could not update your note. Please try again.')
  return
}
setNotes((currentNotes) =>
  currentNotes.map((note) =>
    note.id === editingNoteId ? data : note
  )
)

} else {
// Create a new note
const { data, error } = await supabase
.from('notes')
.insert({
user_id: user.id,
title: trimmedTitle,
content: content.trim(),
})
.select()
.single()

if (error) {
  console.error('Error saving note:', error.message)
  alert('Could not save your note. Please try again.')
  return
}
setNotes((currentNotes) => [data, ...currentNotes])

}

// Reset the form after saving
setTitle('')
setContent('')
setEditingNoteId(null)
setShowForm(false)
}

async function handleDeleteNote(noteId) {
const confirmed = window.confirm(
'Are you sure you want to delete this note?'
)

if (!confirmed) {
  return
}
const { error } = await supabase
  .from('notes')
  .delete()
  .eq('id', noteId)
if (error) {
  console.error('Error deleting note:', error.message)
  alert('Could not delete the note. Please try again.')
  return
}
setNotes((currentNotes) =>
  currentNotes.filter((note) => note.id !== noteId)
)

}

return (

  <div className="min-h-screen bg-[#fafaf7] text-gray-900">
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold">NoteFlow</h1>
          <p className="text-xs text-gray-500">
            Your personal workspace
          </p>
        </div>
        <button
type="button"
onClick={handleLogout}
className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
>
<LogOut size={16} />
Log out
</button>
</div>
</header>
  <main className="mx-auto max-w-6xl px-6 py-12">
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-sm font-medium text-[#718567]">
          YOUR WORKSPACE
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My notes
        </h2>
        <p className="mt-3 text-gray-500">
          Keep your thoughts organised, all in one place.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="flex items-center justify-center gap-2 rounded-full bg-[#53664b] px-6 py-3 font-semibold text-white transition hover:bg-[#40513a]"
      >
        <Plus size={19} />
        New note
      </button>
    </div>
    <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#eeece5] bg-white px-4 py-3">
      <Search size={19} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search your notes..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
    {showForm && (
      <div className="mt-8 rounded-2xl border border-[#eeece5] bg-white p-6">
        <h3 className="text-lg font-semibold">
          Create a new note
        </h3>
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium">
            Note title
          </label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter your note title"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#53664b]"
          />
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Note content
          </label>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your thoughts here..."
            rows={5}
            className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#53664b]"
          />
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {setShowForm(false) 
              setEditingNoteId(null) 
              setTitle('') 
              setContent('')
            }}
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveNote}
            className="rounded-full bg-[#53664b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#40513a]"
          >
            {editingNoteId ? 'Update Note' : 'Create Note'}
          </button>
          {editingNoteId && (
  <button
    type="button"
    onClick={() => {
      setEditingNoteId(null)
      setTitle('')
      setContent('')
      setShowForm(false)
    }}
    className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
  >
    Cancel
  </button>
)}
        </div>
      </div>
    )}
    <div className="mt-10">
      {loading ? (
        <p className="text-center text-gray-500">
          Loading your notes...
        </p>
      ) : filteredNotes.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eadf] text-[#53664b]">
            <FileText size={25} />
          </div>
          <h3 className="mt-5 text-lg font-semibold">
            No notes yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Create your first note and start organising your thoughts.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <article
              key={note.id}
              className="rounded-2xl border border-[#eeece5] bg-white p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{note.title}</h3>
                <button
  type="button"
  onClick={() => handleEditNote(note)}
  aria-label={`Edit ${note.title}`}
  title="Edit note"
  className="rounded-lg p-2 text-gray-400 transition hover:bg-green-50 hover:text-green-600"
>
  <Pencil size={18} />
</button>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  aria-label={`Delete ${note.title}`}
                  title="Delete note"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-500">
                {note.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  </main>
</div>

)
}

export default Dashboard