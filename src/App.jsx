import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setDarkMode(saved === 'dark');
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  if (loading) return <Loader />;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <ScrollProgress />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
