import { moduleZeroLessons } from "@/content/module-0";
import { moduleOneLessons } from "@/content/module-1";
import { moduleTwoLessons } from "@/content/module-2";
import { moduleThreeLessons } from "@/content/module-3";
import { moduleFourLessons } from "@/content/module-4";
import { moduleFiveLessons } from "@/content/module-5";
import { moduleSixLessons } from "@/content/module-6";
import { moduleSevenLessons } from "@/content/module-7";
import { moduleEightLessons } from "@/content/module-8";

export const publishedLessons = [...moduleZeroLessons, ...moduleOneLessons, ...moduleTwoLessons, ...moduleThreeLessons, ...moduleFourLessons, ...moduleFiveLessons, ...moduleSixLessons, ...moduleSevenLessons, ...moduleEightLessons];


export function getPublishedLesson(lessonId: string) {
  return publishedLessons.find((lesson) => lesson.id === lessonId) ?? null;
}
