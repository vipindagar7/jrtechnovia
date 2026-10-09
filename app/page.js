import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Stats from "@/components/Stats";
import Zones from "@/components/Zones";
import Events from "@/components/Events";
import Prizes from "@/components/Prizes";
import Flow from "@/components/Flow";
import Rules from "@/components/Rules";
import Sponsors from "@/components/Sponsors";
import Register from "@/components/Register";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import ModalHost from "@/components/ModalHost";

export default function Page() {
  return (
    <>
      <a href="#events" className="skip">
        Skip to events
      </a>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <Zones />
        <Events />
        <Prizes />
        <Flow />
        <Rules />
        <Sponsors />
        <Register />
      </main>
      <Footer />
      <ModalHost />
    </>
  );
}
