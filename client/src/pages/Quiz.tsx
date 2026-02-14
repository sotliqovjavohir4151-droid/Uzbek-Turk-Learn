import { useRoute } from "wouter";
import { useQuizzes } from "@/hooks/use-data";
import { QuizInterface } from "@/components/QuizInterface";

export default function Quiz() {
  const [matchLesson, paramsLesson] = useRoute("/quiz/lesson/:id");
  const [matchCategory, paramsCategory] = useRoute("/quiz/category/:id");
  const [matchGeneral] = useRoute("/test");

  const lessonId = matchLesson ? parseInt(paramsLesson!.id) : undefined;
  const categoryId = matchCategory ? parseInt(paramsCategory!.id) : undefined;
  
  const { data: quizzes, isLoading } = useQuizzes(lessonId, categoryId);

  let title = "Umumiy Test";
  if (matchLesson) title = `Dars bo‘yicha test`;
  if (matchCategory) title = `Mavzu bo‘yicha test`;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;
  }

  if (!quizzes || quizzes.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">Savollar topilmadi</div>;
  }

  return (
    <QuizInterface 
      questions={quizzes} 
      onComplete={(score) => console.log("Completed with score:", score)} 
      title={title}
    />
  );
}
