import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Bayview Hub",
  description: "Thank you for submitting your feasibility checklist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
