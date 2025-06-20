import { Hero } from "@/modules/landing/hero";
import { Features } from "@/modules/landing/features";
import { Employees } from "@/modules/landing/employees";
import { PremiumFeatures } from "@/modules/landing/premium-features";
import { Demo } from "@/modules/landing/demo";
import { TryNow } from "@/modules/landing/try-now";
import { Phrase } from "@/modules/landing/phrase";

export default function Page() {
  return (
    <div>
      <Hero />
      <Phrase />
      <Features />
      <Employees />
      <PremiumFeatures />
      <Demo />
      <TryNow />
    </div>
  );
}