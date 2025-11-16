import { AboutUs } from "./components/AboutUs";
import { InitSection } from "./components/InitSection";
import { Mission } from "./components/Mission";
import { Services } from "./components/Services";
import { InitCard } from "./components/InitCard";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <InitSection />
      <InitCard />
      <AboutUs />
      <Services />
      <Mission />
    </div>
  );
}