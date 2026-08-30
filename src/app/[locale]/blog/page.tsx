import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { metaZaStran } from "@/i18n/meta";
import SiteNavbar from "@/components/SiteNavbar";
import BlogPageContent from "@/components/blog/BlogPageContent";
import SiteFooter from "@/components/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;


  const meta = await metaZaStran({
    locale,
    pot: "/blog",
    naslovKljuc: "blogNaslov",
    opisKljuc: "blogOpis",
    ogOpisKljuc: "blogOgOpis",
  });

  return meta;
}

export default function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Brez te vrstice se stran ne zgradi vnaprej, ampak ob vsakem obisku.
  // use() namesto await, da komponenta ostane sinhrona in sme uporabljati hooke.
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main>
      <SiteNavbar activeRoute="blog" />
      <BlogPageContent />
      <SiteFooter />
    </main>
  );
}
