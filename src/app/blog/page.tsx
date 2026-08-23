import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import BlogPageContent from "@/components/blog/BlogPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kulinarični Blog & Zgodbe Žara | Šeherezada Ljubljana",
  description:
    "Odkrijte skrivnosti 24-urne marinade, sveže pečene lepinje, domačih falaflov in pristne orientalske kulinarične tradicije v restavraciji Šeherezada Ljubljana.",
  keywords: [
    "Šeherezada blog",
    "kulinarične zgodbe",
    "orientalski žar Ljubljana",
    "recepti za lepinje",
    "domači falafel",
    "halal hrana Ljubljana",
    "študentski boni hrana",
  ],
  openGraph: {
    title: "Kulinarični Blog & Zgodbe Žara | Šeherezada Ljubljana",
    description:
      "Spoznajte umetnost orientalske kulinarične tradicije, skrivnosti priprave svežih jedi in zgodbe naših mojstrov peke in žara.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function BlogPage() {
  return (
    <main>
      <SiteNavbar activeRoute="blog" />
      <BlogPageContent />
      <SiteFooter />
    </main>
  );
}
