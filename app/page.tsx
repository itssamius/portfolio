import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
