
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default App;
