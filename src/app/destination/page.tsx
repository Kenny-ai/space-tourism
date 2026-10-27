import type { Metadata } from "next";
import Destination from "../../components/Destination";
export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Discover the Moon, Mars, Europa, and Titan. Compare distances and travel times for your next great adventure.",
};
export default function DestinationPage() {
  return <Destination />;
}
