import { moduleZeroLessons } from "@/content/module-0";
import { moduleOneLessons } from "@/content/module-1";
import { moduleTwoLessons } from "@/content/module-2";

export const publishedLessons = [...moduleZeroLessons, ...moduleOneLessons, ...moduleTwoLessons];

export function getPublishedLesson(lessonId: string) {
  return publishedLessons.find((lesson) => lesson.id === lessonId) ?? null;
}
