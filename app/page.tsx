import { Navbar } from "../components/sections/Navbar";
import { Hero } from "../components/sections/Hero";
import { SynthiaIntro } from "../components/sections/SynthiaIntro";
import { CourseModules } from "../components/sections/CourseModules";
import { LearningJourney } from "../components/sections/LearningJourney";
import { ProgressPreview } from "../components/sections/ProgressPreview";
import { Footer } from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SynthiaIntro />
        <CourseModules />
        <LearningJourney />
        <ProgressPreview />
      </main>
      <Footer />
    </>
  );
}
