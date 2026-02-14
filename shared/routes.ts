import { z } from 'zod';
import { insertWordSchema, insertLessonSchema, insertProgressSchema } from './schema';

export const api = {
  words: {
    list: {
      method: 'GET' as const,
      path: '/api/words' as const,
      input: z.object({
        category: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
        offset: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.array(insertWordSchema.extend({ id: z.number() })),
      },
    },
  },
  lessons: {
    list: {
      method: 'GET' as const,
      path: '/api/lessons' as const,
      input: z.object({
        level: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(insertLessonSchema.extend({ id: z.number() })),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/lessons/:id' as const,
      responses: {
        200: insertLessonSchema.extend({ id: z.number() }),
        404: z.object({ message: z.string() }),
      },
    },
  },
  quizzes: {
    list: {
      method: 'GET' as const,
      path: '/api/quizzes' as const,
      input: z.object({
        lessonId: z.coerce.number().optional(),
        categoryId: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.array(z.object({
          id: z.number(),
          question: z.string(),
          options: z.array(z.string()),
          correctAnswer: z.number(),
        })),
      },
    },
  },
  progress: {
    update: {
      method: 'POST' as const,
      path: '/api/progress' as const,
      input: insertProgressSchema,
      responses: {
        200: insertProgressSchema.extend({ id: z.number() }),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/progress' as const,
      responses: {
        200: z.array(insertProgressSchema.extend({ id: z.number() })),
      },
    },
  },
};

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};
