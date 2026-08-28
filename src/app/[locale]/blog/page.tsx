import type { Metadata } from "next";
import SiteNavbar from "@/components/SiteNavbar";
import BlogPageContent from "@/components/blog/BlogPageContent";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog — hrana, halal in boni v Ljubljani | Šeherezada",
  description:
    "Nasveti in zgodbe o halal ponudbi, veganskih jedeh in študentskih bonih v Šeherezadi — restavraciji v središču Ljubljane.",
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
    title: "Blog — hrana, halal in boni v Ljubljani | Šeherezada",
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
