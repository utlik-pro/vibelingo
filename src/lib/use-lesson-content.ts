import { useI18n } from './i18n';
import type { Lesson, LessonStep } from '@/data/lessons';

// Returns localized lesson content based on current locale
export function useLessonContent() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  const getTitle = (lesson: Lesson) => isEn ? (lesson.titleEn || lesson.title) : lesson.title;

  const getStepTitle = (step: LessonStep) => isEn ? (step.titleEn || step.title) : step.title;
  const getStepContent = (step: LessonStep) => isEn ? (step.contentEn || step.content) : step.content;
  const getStepQuestion = (step: LessonStep) => isEn ? (step.questionEn || step.question) : step.question;
  const getStepOptions = (step: LessonStep) => isEn ? (step.optionsEn || step.options) : step.options;
  const getStepItems = (step: LessonStep) => isEn ? (step.itemsEn || step.items) : step.items;
  const getStepExplanation = (step: LessonStep) => isEn ? (step.explanationEn || step.explanation) : step.explanation;

  return { getTitle, getStepTitle, getStepContent, getStepQuestion, getStepOptions, getStepItems, getStepExplanation };
}
