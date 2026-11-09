import { SynthiaGuide } from "../synthia/SynthiaGuide";
import { SectionHeading } from "../ui/SectionHeading";

export function SynthiaIntro() {
  return (
    <section id="synthia" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="Your companion"
        title="Meet SYNTHIA"
        description="A friendly learning companion. Pick a topic, collect her tips and take on a quick challenge to master all five."
      />
      <SynthiaGuide />
    </section>
  );
}
