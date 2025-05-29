import React from 'react';

// Define the Note type locally to avoid import issues for now
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

interface NoteCardProps {
  note: Note;
  onClick?: (note: Note) => void;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

export function NoteCard({ note, onClick, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div
      className="note-card"
      onClick={() => onClick?.(note)}
      style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#ffffff',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.2s ease',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#1a202c' }}>
          {note.title}
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: '#4a5568',
              }}
              title="Edit note"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Are you sure you want to delete this note?')) {
                  onDelete(note);
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: '#e53e3e',
              }}
              title="Delete note"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      <p style={{ margin: '0 0 12px 0', color: '#4a5568', lineHeight: '1.5' }}>
        {truncateContent(note.content)}
      </p>
      
      {note.tags && (
        <div style={{ marginBottom: '8px' }}>
          {note.tags.split(',').map((tag: string, index: number) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                backgroundColor: '#edf2f7',
                color: '#2d3748',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                marginRight: '4px',
                marginBottom: '4px',
              }}
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
      
      <div style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
        <span>Updated: {formatDate(note.updated_at)}</span>
      </div>
    </div>
  );
}