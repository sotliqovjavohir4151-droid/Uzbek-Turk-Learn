import { useRoute } from "wouter";
import { useQuizzes } from "@/hooks/use-data";
import { QuizInterface } from "@/components/QuizInterface";
import { useProgress } from "@/context/ProgressContext";
import { toast } from "@/components/ui/use-toast";

export default function Quiz() {
  const [matchLesson, paramsLesson] = useRoute("/quiz/lesson/:id");
  const [matchCategory, paramsCategory] = useRoute("/quiz/category/:id");
  const [matchGeneral] = useRoute("/test");

  const lessonId = matchLesson ? parseInt(paramsLesson!.id) : undefined;
  const categoryId = matchCategory ? parseInt(paramsCategory!.id) : undefined;

  const { data: quizzes, isLoading } = useQuizzes(lessonId, categoryId);

  const { addPercent } = useProgress(); // ProgressContext dan olamiz

  let title = "Umumiy Test";
  if (matchLesson) title = "Dars bo‘yicha test";
  if (matchCategory) title = "Mavzu bo‘yicha test";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Savollar topilmadi
      </div>
    );
  }

  return (
    <QuizInterface
      questions={quizzes}
      title={title}
      onComplete={(score: number) => {
        // score bu test foizi (masalan 57)

        const addedPercent = Math.floor(score / 10) / 10;

        addPercent(addedPercent);

        toast({
          title: "Test yakunlandi 🎉",
          description: `${score}% natija. Umumiy progressga +${addedPercent}% qo‘shildi.`,
        });

        if (score === 100) {
          console.log("100% — maxsus animatsiya qo‘shish mumkin");
        }
      }}
    />
  );
}