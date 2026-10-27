import type { Metadata } from "next";
import Technology from "../../components/Technology";
export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore the launch vehicles, spaceports, and space capsules making the journey possible.",
};
export default function TechnologyPage() {
  return <Technology />;
}
