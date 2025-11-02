import { InitSection } from "./components/InitSection";
import { InitCard } from "./components/InitCard";

export default function Home() {
  return (
    <div className="flex flex-col mx-20">
      <InitSection />
      <InitCard />
    </div>
  );
}
