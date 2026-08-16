import SeherezadaHero from "@/components/SeherezadaHero";
import PopularPicks from "@/components/PopularPicks";
import OurStory from "@/components/OurStory";
import HalalCertificate from "@/components/HalalCertificate";
import StudentVouchers from "@/components/StudentVouchers";

export default function Home() {
  return (
    <main>
      <SeherezadaHero />
      <PopularPicks />
      <OurStory />
      <HalalCertificate />
      <StudentVouchers />
    </main>
  );
}
