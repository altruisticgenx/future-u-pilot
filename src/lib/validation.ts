import { z } from 'zod';

// Project validation schema
export const projectSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters"),
  description: z.string().trim().max(500, "Description must be less than 500 characters").optional(),
  status: z.enum(['active', 'archived', 'planned']).optional(),
  tags: z.array(z.string().max(50)).max(10, "Maximum 10 tags allowed").optional(),
  github_url: z.string().url("Invalid URL format").max(500).optional().or(z.literal('')),
  repository_name: z.string().max(255).optional(),
});

// Command input validation schema
export const commandInputSchema = z.string().min(1, "Command cannot be empty").max(1000, "Command too long");

// File upload validation schema
export const fileUploadSchema = z.object({
  size: z.number().max(52428800, "File size must be less than 50MB"),
  type: z.string().regex(/^(application|text|image)\//, "Invalid file type"),
  name: z.string().max(255, "Filename too long"),
});

// Terminal message validation
export const terminalMessageSchema = z.object({
  content: z.string().max(10000, "Message content too long"),
  type: z.enum(['input', 'output', 'error', 'info', 'success', 'system']),
  session_id: z.string().uuid().optional(),
});

// Git action validation
export const gitActionSchema = z.object({
  action_type: z.enum(['commit', 'push', 'pull', 'branch', 'merge', 'status', 'log']),
  repository: z.string().max(255).optional(),
  branch: z.string().max(100).optional(),
  message: z.string().max(500).optional(),
});

// Helper function to validate and sanitize data
export function validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; error?: string } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Validation failed' };
  }
}
