import Experience from "./sections/Experience";
import HeroSection from "./sections/HeroSection";
import Overview from "./sections/Overview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Overview />
      <Experience />
    </div>
  );
}
