import { Navbar } from "../components/sections/Navbar";
import { Hero } from "../components/sections/Hero";
import { SynthiaIntro } from "../components/sections/SynthiaIntro";
import { CourseModules } from "../components/sections/CourseModules";
import { LearningJourney } from "../components/sections/LearningJourney";
import { ProgressPreview } from "../components/sections/ProgressPreview";
import { Footer } from "../components/sections/Footer";
import { ProgressProvider } from "../components/progress/ProgressProvider";
import { WelcomeExperience } from "../components/intro/WelcomeExperience";
import { Reveal } from "../components/ui/Reveal";
import { StarField } from "../components/ui/StarField";
import { CursorGlow } from "../components/ui/CursorGlow";
import { ScrollProgress } from "../components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <StarField />
      <CursorGlow />
      <ScrollProgress />
      <WelcomeExperience />
      <Navbar />
      <ProgressProvider>
        <main>
          <Hero />
          <Reveal>
            <SynthiaIntro />
          </Reveal>
          <Reveal>
            <CourseModules />
          </Reveal>
          <Reveal>
            <LearningJourney />
          </Reveal>
          <Reveal>
            <ProgressPreview />
          </Reveal>
        </main>
      </ProgressProvider>
      <Footer />
    </>
  );
}
