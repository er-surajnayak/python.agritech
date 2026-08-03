import { moduleZeroLessons } from "@/content/module-0";
import { moduleOneLessons } from "@/content/module-1";
import { moduleTwoLessons } from "@/content/module-2";
import { moduleThreeLessons } from "@/content/module-3";

export const publishedLessons = [...moduleZeroLessons, ...moduleOneLessons, ...moduleTwoLessons, ...moduleThreeLessons];

export function getPublishedLesson(lessonId: string) {
  return publishedLessons.find((lesson) => lesson.id === lessonId) ?? null;
}
