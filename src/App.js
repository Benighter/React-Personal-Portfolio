import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import GoUpButton from './components/GoUpButton/GoUpButton';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
      <Footer />
      <Services />
      <Projects />
      <Skills />
      <Contact />
      <GoUpButton />
    </div>
  );
}

export default App;
