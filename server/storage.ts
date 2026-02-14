import { db } from "./db";
import {
  words, lessons, quizzes, progress,
  type Word, type Lesson, type Quiz, type Progress
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Words
  getWords(category?: number, limit?: number, offset?: number): Promise<Word[]>;
  
  // Lessons
  getLessons(level?: string): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  
  // Quizzes
  getQuizzes(lessonId?: number, categoryId?: number): Promise<Quiz[]>;
  
  // Progress
  updateProgress(userId: number, lessonId: number, score: number, completed: boolean): Promise<Progress>;
  getProgress(userId: number): Promise<Progress[]>;
}

export class DatabaseStorage implements IStorage {
  async getWords(category?: number, limit: number = 100, offset: number = 0): Promise<Word[]> {
    let query = db.select().from(words).limit(limit).offset(offset);
    if (category) {
      query.where(eq(words.category, category));
    }
    return await query;
  }

  async getLessons(level?: string): Promise<Lesson[]> {
    if (level) {
      return await db.select().from(lessons).where(eq(lessons.level, level));
    }
    return await db.select().from(lessons);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async getQuizzes(lessonId?: number, categoryId?: number): Promise<Quiz[]> {
    if (lessonId) {
      return await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId));
    }
    if (categoryId) {
      return await db.select().from(quizzes).where(eq(quizzes.categoryId, categoryId));
    }
    return await db.select().from(quizzes).limit(20); // General test
  }

  async updateProgress(userId: number, lessonId: number, score: number, completed: boolean): Promise<Progress> {
    // Check if progress exists
    const [existing] = await db.select()
      .from(progress)
      .where(and(eq(progress.userId, userId), eq(progress.lessonId, lessonId)));

    if (existing) {
      const [updated] = await db.update(progress)
        .set({ score, completed })
        .where(eq(progress.id, existing.id))
        .returning();
      return updated;
    } else {
      const [newItem] = await db.insert(progress)
        .values({ userId, lessonId, score, completed })
        .returning();
      return newItem;
    }
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return await db.select().from(progress).where(eq(progress.userId, userId));
  }
}

export const storage = new DatabaseStorage();
