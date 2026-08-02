import {
  AgricultureAnalytics,
  Calculator,
  ChartLine,
  Code,
  Cube,
  Education,
  Flow,
  List,
  Table,
  Terminal,
  type CarbonIconType,
} from "@carbon/icons-react";
import type { CourseIconName } from "@/types/course";

const icons: Record<CourseIconName, CarbonIconType> = {
  education: Education,
  code: Code,
  logic: Flow,
  collections: List,
  terminal: Terminal,
  objects: Cube,
  numpy: Calculator,
  pandas: Table,
  visualization: ChartLine,
  agritech: AgricultureAnalytics,
};

export function CourseIcon({ name, size = 20 }: { name: CourseIconName; size?: number }) {
  const Icon = icons[name];
  return <Icon size={size} aria-hidden="true" />;
}
