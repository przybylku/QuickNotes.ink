import { z } from 'zod';

// Note schema matching the Go API
export const NoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional().default(''),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Note = z.infer<typeof NoteSchema>;

// Request schemas
export const CreateNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional().default(''),
});

export type CreateNoteRequest = z.infer<typeof CreateNoteSchema>;

export const UpdateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.string().optional(),
});

export type UpdateNoteRequest = z.infer<typeof UpdateNoteSchema>;

// API Response schemas
export const NotesResponseSchema = z.object({
  notes: z.array(NoteSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
});

export type NotesResponse = z.infer<typeof NotesResponseSchema>;

export const HealthResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Search and pagination types
export interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
}

// API Error type
export interface ApiError {
  error: string;
  details?: string;
} 