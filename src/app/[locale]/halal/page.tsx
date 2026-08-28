import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import HalalPageContent from "@/components/halal/HalalPageContent";
import { HALAL_FAQS } from "@/components/halal/halalFaqs";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/halal" },
  title: "Halal hrana v Ljubljani — kaj to pomeni pri nas | Šeherezada",
  description:
    "Kaj pomeni halal, kako se v Sloveniji certificira in kaj to pomeni na našem meniju: brez svinjine, brez alkohola, halal meso na obeh lokacijah v Ljubljani.",
};

export default function HalalPage() {
  return (
    <main>
      {/* Vprašanja so vidna na strani — schema samo ponovi, kar gost že bere. */}
      <FaqJsonLd items={HALAL_FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      <SiteNavbar activeRoute="halal" />
      <HalalPageContent />
      <SiteFooter />
    </main>
  );
}
