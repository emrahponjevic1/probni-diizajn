import SeherezadaHero from "@/components/SeherezadaHero";
import PopularPicks from "@/components/PopularPicks";
import OurStory from "@/components/OurStory";
import HalalCertificate from "@/components/HalalCertificate";
import HeaderStylesPreview from "@/components/HeaderStylesPreview";

export default function Home() {
  return (
    <main>
      <SeherezadaHero />
      <PopularPicks />
      <OurStory />
      <HalalCertificate />
      <HeaderStylesPreview />
    </main>
  );
}
