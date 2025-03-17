import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import GoUpButton from './components/GoUpButton/GoUpButton';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <About />
      <Contact />
      <Footer />
      <GoUpButton />
    </div>
  );
}

export default App;
