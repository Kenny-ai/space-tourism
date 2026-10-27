import type { Metadata } from "next";
import Crew from "../../components/Crew";
export const metadata: Metadata = {
  title: "Meet the crew",
  description:
    "Meet the extraordinary people behind your journey beyond Earth.",
};
export default function CrewPage() {
  return <Crew />;
}
