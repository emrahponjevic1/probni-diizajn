import SiteNavbar from "@/components/SiteNavbar";
import SeherezadaHero from "@/components/SeherezadaHero";
import PopularPicks from "@/components/PopularPicks";
import OurStory from "@/components/OurStory";
import HalalCertificate from "@/components/HalalCertificate";
import StudentVouchers from "@/components/StudentVouchers";
import CustomerReviews from "@/components/CustomerReviews";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <SiteNavbar activeRoute="home" />
      <SeherezadaHero />
      <PopularPicks />
      <OurStory />
      <HalalCertificate />
      <StudentVouchers />
      <CustomerReviews />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
