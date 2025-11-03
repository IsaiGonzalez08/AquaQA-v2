import { InitSection } from "./components/InitSection";
import { InitCard } from "./components/InitCard";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";

export default function Home() {
  return (
    <div className="flex flex-col">
      <InitSection />
      <InitCard />
      <AboutUs />
      <Services />
    </div>
  );
}
