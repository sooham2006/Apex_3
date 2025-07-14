import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Quiz from './components/Quiz';
import ImageCarousel from './components/ImageCarousel';
import Weather from './components/Weather';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home setActiveSection={setActiveSection} />;
      case 'quiz':
        return <Quiz />;
      case 'carousel':
        return <ImageCarousel />;
      case 'weather':
        return <Weather />;
      default:
        return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
    </div>
  );
}

export default App;