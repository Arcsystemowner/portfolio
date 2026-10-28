import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import FrontendPlayground from "./sections/FrontendPlayground";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Observability from "./sections/Observability";
import WaterCatchGame from "./sections/WaterCatchGame";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import TerminalMode from "./components/TerminalMode";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  useTheme();

  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl+` or Cmd+K
      if ((e.ctrlKey && e.key === '`') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <FrontendPlayground />
        <Observability />
        <WaterCatchGame />
        <Contact />
      </main>
      <Footer />
      <TerminalMode
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
      {/* <ThemeSwitcher /> */}
    </div>
  );
}

export default App;
