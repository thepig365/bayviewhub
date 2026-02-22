import type { Metadata } from "next";
import { robotsByEnv } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thank You | Bayview Hub",
  description: "Thank you for submitting your feasibility checklist.",
  robots: robotsByEnv(),
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
