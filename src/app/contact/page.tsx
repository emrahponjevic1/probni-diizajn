import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import ContactPageContent from "@/components/contact/ContactPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Contact & Locations · Trubarjeva & Slovenska | Šeherezada Ljubljana",
  description:
    "Visit Šeherezada at Trubarjeva 31 or Slovenska 55 in Ljubljana. Call +386 (01) 430 52 40 or submit inquiries for catering and group orders.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteNavbar activeRoute="kontakt" />
      <ContactPageContent />
      <SiteFooter />
    </main>
  );
}
