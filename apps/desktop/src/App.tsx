import { useState, useEffect } from "react";
import "./App.css";

// Local type definitions to avoid import issues
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tags?: string;
}

interface NotesResponse {
  notes: Note[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// API client
const API_BASE_URL = 'http://localhost:8080/api/v1';

const apiClient = {
  async getNotes(search?: string): Promise<NotesResponse> {
    const url = search 
      ? `${API_BASE_URL}/notes?search=${encodeURIComponent(search)}`
      : `${API_BASE_URL}/notes`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  async createNote(note: CreateNoteRequest): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  async updateNote(id: string, note: Partial<CreateNoteRequest>): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    checkApiConnection();
  }, []);

  useEffect(() => {
    if (isApiConnected) {
      loadNotes();
    }
  }, [isApiConnected, searchTerm]);

  const checkApiConnection = async () => {
    const connected = await apiClient.checkHealth();
    setIsApiConnected(connected);
  };

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getNotes(searchTerm);
      setNotes(response.notes);
    } catch (error) {
      console.error('Failed to load notes:', error);
      setIsApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const newNote = await apiClient.createNote({
        title: title.trim(),
        content: content.trim(),
        tags: tags.trim(),
      });
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setTags("");
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleUpdateNote = async () => {
    if (!selectedNote || !title.trim() || !content.trim()) return;

    try {
      const updatedNote = await apiClient.updateNote(selectedNote.id, {
        title: title.trim(),
        content: content.trim(),
        tags: tags.trim(),
      });
      setNotes(notes.map(note => note.id === selectedNote.id ? updatedNote : note));
      setSelectedNote(updatedNote);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteToDelete: Note) => {
    try {
      await apiClient.deleteNote(noteToDelete.id);
      setNotes(notes.filter(note => note.id !== noteToDelete.id));
      if (selectedNote?.id === noteToDelete.id) {
        setSelectedNote(null);
        clearForm();
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags);
    setIsCreating(false);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setSelectedNote(null);
    setIsCreating(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isApiConnected) {
    return (
      <div className="container">
        <div className="error-state">
          <h1>🔌 API Connection Required</h1>
          <p>Please start the Go API server first:</p>
          <code>pnpm dev --filter=api</code>
          <br />
          <button onClick={checkApiConnection} style={{ marginTop: '20px' }}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>📝 QuickNotes</h1>
          <button 
            className="new-note-btn"
            onClick={() => {
              setIsCreating(true);
              clearForm();
            }}
          >
            + New Note
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="notes-list">
          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? 'No notes found' : 'No notes yet'}
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
                onClick={() => handleSelectNote(note)}
              >
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 100)}...</p>
                <div className="note-meta">
                  {formatDate(note.updated_at)}
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this note?')) {
                        handleDeleteNote(note);
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="main-content">
        {isCreating || selectedNote ? (
          <div className="editor">
            <div className="editor-header">
              <input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
              />
              <div className="editor-actions">
                <button onClick={clearForm} className="btn-secondary">
                  Cancel
                </button>
                <button 
                  onClick={isCreating ? handleCreateNote : handleUpdateNote}
                  className="btn-primary"
                  disabled={!title.trim() || !content.trim()}
                >
                  {isCreating ? 'Create' : 'Save'}
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="tags-input"
            />

            <textarea
              placeholder="Write your note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-textarea"
            />
          </div>
        ) : (
          <div className="welcome-state">
            <h2>Welcome to QuickNotes! ✨</h2>
            <p>Select a note from the sidebar or create a new one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
