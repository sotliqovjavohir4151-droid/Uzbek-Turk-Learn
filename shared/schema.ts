import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const words = pgTable("words", {
  id: serial("id").primaryKey(),
  turkish: text("turkish").notNull(),
  uzbek: text("uzbek").notNull(),
  category: integer("category").notNull(), // 1-90
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  level: text("level").notNull(), // A1, A2, B1, B2
  videoUrl: text("video_url").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id), // Nullable if it's a general test or category quiz
  categoryId: integer("category_id"), // For word quizzes
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of strings
  correctAnswer: integer("correct_answer").notNull(), // Index
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().default(1), // Mock user ID
  lessonId: integer("lesson_id").references(() => lessons.id),
  score: integer("score"),
  completed: boolean("completed").default(false),
});

export const insertWordSchema = createInsertSchema(words);
export const insertLessonSchema = createInsertSchema(lessons);
export const insertQuizSchema = createInsertSchema(quizzes);
export const insertProgressSchema = createInsertSchema(progress);

export type Word = typeof words.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type Progress = typeof progress.$inferSelect;
