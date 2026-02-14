import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertProgress } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";

// --- Words ---
export function useWords(category?: number) {
  return useQuery({
    queryKey: [api.words.list.path, category],
    queryFn: async () => {
      // In a real app, we would fetch from API
      // const res = await fetch(`${api.words.list.path}${category ? `?category=${category}` : ''}`);
      // return await res.json();
      
      // MOCK DATA
      return Array.from({ length: 20 }).map((_, i) => ({
        id: i + 1,
        turkish: ["Merhaba", "Teşekkürler", "Nasılsın", "İyi", "Güzel", "Aşk", "Arkadaş", "Kitap", "Su", "Ekmek"][i % 10],
        uzbek: ["Salom", "Rahmat", "Qalaysiz", "Yaxshi", "Chiroyli", "Sevgi", "Do'st", "Kitob", "Suv", "Non"][i % 10],
        category: category || 1
      }));
    },
  });
}

// --- Lessons ---
export function useLessons(level: string = 'A1') {
  return useQuery({
    queryKey: [api.lessons.list.path, level],
    queryFn: async () => {
      // MOCK DATA
      return Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        title: `${level} Daraja: ${i + 1}-dars. Tanishuv va salomlashish`,
        level,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        content: "Bu darsda biz turk tilida qanday salomlashish va o'zini tanishtirishni o'rganamiz. Turk madaniyatida salomlashish juda muhim...",
        order: i + 1
      }));
    },
  });
}

export function useLesson(id: number) {
  return useQuery({
    queryKey: [api.lessons.get.path, id],
    queryFn: async () => {
      // MOCK DATA
      return {
        id,
        title: "A1 Daraja: 1-dars. Tanishuv",
        level: "A1",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: "Bu darsda biz turk tilida qanday salomlashish va o'zini tanishtirishni o'rganamiz. Asosiy iboralar: Merhaba (Salom), Nasılsın (Qalaysiz), İyiyim (Yaxshiman).",
        order: 1
      };
    },
  });
}

// --- Quizzes ---
export function useQuizzes(lessonId?: number, categoryId?: number) {
  return useQuery({
    queryKey: [api.quizzes.list.path, lessonId, categoryId],
    queryFn: async () => {
      // MOCK DATA
      return Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        question: `Turk tilida "${["Salom", "Rahmat", "Yaxshi", "Kitob"][i % 4]}" nima deyiladi?`,
        options: ["Merhaba", "Teşekkürler", "İyi", "Kitap"],
        correctAnswer: i % 4
      }));
    },
  });
}

// --- Progress ---
export function useProgress() {
  return useQuery({
    queryKey: [api.progress.get.path],
    queryFn: async () => {
      // MOCK DATA
      return [
        { id: 1, userId: 1, lessonId: 1, score: 80, completed: true },
        { id: 2, userId: 1, lessonId: 2, score: 60, completed: false }
      ];
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertProgress) => {
      // await apiRequest("POST", api.progress.update.path, data);
      return { success: true }; // Mock success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.progress.get.path] });
    },
  });
}
