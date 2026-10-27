import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { StateProvider } from "../Context/StateProvider";
import SiteShell from "../components/SiteShell";
import "./globals.css";

const bellefair = localFont({
  src: "./fonts/bellefair-latin-400-normal.woff2",
  variable: "--font-display",
  display: "swap",
});
const barlow = localFont({
  src: [
    { path: "./fonts/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/barlow-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/barlow-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Space Tourism — Beyond the everyday",
    template: "%s | Space Tourism",
  },
  description:
    "Leave the familiar behind. Explore four extraordinary destinations, meet your crew, and discover the technology taking us further.",
  icons: { icon: "/assets/shared/logo.svg", apple: "/assets/shared/logo.svg" },
  manifest: "/manifest.json",
};
export const viewport: Viewport = {
  themeColor: "#080d16",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bellefair.variable} ${barlow.variable}`}
    >
      <body>
        <StateProvider>
          <SiteShell>{children}</SiteShell>
        </StateProvider>
      </body>
    </html>
  );
}
