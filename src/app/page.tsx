import { HeroSection } from "@/components/home/HeroSection";
import { GenderSection } from "@/components/home/GenderSection";
import { FitSection } from "@/components/home/FitSection";
import { EditorialSection } from "@/components/home/EditorialSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GenderSection />
      <FitSection />
      <EditorialSection />
      <NewsletterSection />
    </>
  );
}
