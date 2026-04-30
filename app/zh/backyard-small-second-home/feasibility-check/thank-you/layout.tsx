import type { Metadata } from "next";
import { robotsByEnv } from "@/lib/seo";

export const metadata: Metadata = {
  title: "感谢提交 | Bayview Hub",
  description: "你已提交可行性问询，我们将在约 48 小时内给出第一层阅读回复。",
  robots: robotsByEnv(),
};

export default function ThankYouLayoutZh({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
