import { Nav } from "../components/Nav";
import { Hero, Problem, Opportunity } from "../sections/intro";
import { Model, Services, Innovation } from "../sections/model";
import { Financials, Ask, Roadmap, Edge, Contact } from "../sections/close";

export default function Home() {
  return (
    <div className="bg-[var(--nx-bg)] text-[var(--nx-cream)] min-h-[100dvh]">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Opportunity />
        <Model />
        <Services />
        <Innovation />
        <Financials />
        <Ask />
        <Roadmap />
        <Edge />
        <Contact />
      </main>
    </div>
  );
}
