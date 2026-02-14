import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.words.list.path, async (req, res) => {
    const category = req.query.category ? Number(req.query.category) : undefined;
    const words = await storage.getWords(category);
    res.json(words);
  });

  app.get(api.lessons.list.path, async (req, res) => {
    const level = req.query.level as string | undefined;
    const lessons = await storage.getLessons(level);
    res.json(lessons);
  });

  app.get(api.lessons.get.path, async (req, res) => {
    const lesson = await storage.getLesson(Number(req.params.id));
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  });

  app.get(api.quizzes.list.path, async (req, res) => {
    const lessonId = req.query.lessonId ? Number(req.query.lessonId) : undefined;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const quizzes = await storage.getQuizzes(lessonId, categoryId);
    res.json(quizzes);
  });

  app.post(api.progress.update.path, async (req, res) => {
    const input = api.progress.update.input.parse(req.body);
    // Mock user ID 1 for now
    const updated = await storage.updateProgress(1, input.lessonId!, input.score!, input.completed!);
    res.json(updated);
  });

  app.get(api.progress.get.path, async (req, res) => {
    const progress = await storage.getProgress(1); // Mock user ID 1
    res.json(progress);
  });

  await seedDatabase();

  return httpServer;
}

export async function seedDatabase() {
  const existingLessons = await storage.getLessons();
  if (existingLessons.length === 0) {
    console.log("Seeding database...");
    
    // Seed Lessons
    await storage.db.insert(schema.lessons).values([
      { title: "Salomlashish", level: "A1", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", content: "Turk tilida salomlashish turlari...", order: 1 },
      { title: "Oila a'zolari", level: "A1", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", content: "Ota, ona, aka, uka...", order: 2 },
      { title: "Hozirgi zamon", level: "A2", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", content: "-yor qo'shimchasi...", order: 1 },
    ]);

    // Seed Words (Sample)
    await storage.db.insert(schema.words).values([
      { turkish: "Merhaba", uzbek: "Salom", category: 1 },
      { turkish: "Nasılsın?", uzbek: "Qalaysiz?", category: 1 },
      { turkish: "Teşekkür ederim", uzbek: "Rahmat", category: 1 },
      { turkish: "Anne", uzbek: "Ona", category: 2 },
      { turkish: "Baba", uzbek: "Ota", category: 2 },
    ]);

    // Seed Quizzes
    await storage.db.insert(schema.quizzes).values([
      { lessonId: 1, question: "Salom turkchada nima bo'ladi?", options: ["Merhaba", "Güle güle", "Evet", "Hayır"], correctAnswer: 0 },
      { lessonId: 1, question: "Qalaysiz?", options: ["Nasılsın?", "Nerelesin?", "Kimsin?", "Ne yapıyorsun?"], correctAnswer: 0 },
      { categoryId: 1, question: "Rahmat", options: ["Teşekkürler", "Lütfen", "Pardon", "Tamam"], correctAnswer: 0 },
    ]);
    
    console.log("Database seeded!");
  }
}

// Helper to access db in seed function since storage is exported as instance
import { db } from "./db";
import * as schema from "@shared/schema";
// Patch storage to expose db for seeding if needed or just import db directly
(storage as any).db = db;
