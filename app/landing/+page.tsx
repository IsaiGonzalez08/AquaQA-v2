import { AboutUs } from "./components/AboutUs";
import { InitSection } from "./components/InitSection";
import { Mission } from "./components/Mission";
import { Services } from "./components/Services";
import { InitCard } from "./components/InitCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <InitSection />
      <InitCard />
      <AboutUs />
      <Services />
      <Mission />
      <Footer />
    </div>
  );
}