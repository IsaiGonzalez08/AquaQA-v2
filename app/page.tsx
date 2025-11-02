import { InitSection } from "./components/InitSection";
import { InitCard } from "./components/InitCard";
import { AboutUs } from "./components/AboutUs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <InitSection />
      <InitCard />
      <AboutUs />
    </div>
  );
}
