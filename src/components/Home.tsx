import React from 'react';
import { Brain, Image, Cloud, Sparkles, Zap, Target, Globe, Code, Palette, Smartphone } from 'lucide-react';

interface HomeProps {
  setActiveSection: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ setActiveSection }) => {
  const features = [
    {
      icon: Brain,
      title: 'Interactive Quiz',
      description: 'Test your knowledge with our comprehensive quiz featuring 20 questions across multiple categories.',
      color: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-50 to-pink-50',
      action: () => setActiveSection('quiz')
    },
    {
      icon: Image,
      title: 'Image Gallery',
      description: 'Explore 30 stunning images with carousel and grid views, featuring smooth transitions.',
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'from-blue-50 to-cyan-50',
      action: () => setActiveSection('carousel')
    },
    {
      icon: Cloud,
      title: 'Weather Dashboard',
      description: 'Get real-time weather data with beautiful visualizations and comprehensive forecasts.',
      color: 'from-emerald-400 to-teal-400',
      bgColor: 'from-emerald-50 to-teal-50',
      action: () => setActiveSection('weather')
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', color: 'text-blue-500' },
    { name: 'TypeScript', icon: '📘', color: 'text-blue-600' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'text-cyan-500' },
    { name: 'Vite', icon: '⚡', color: 'text-yellow-500' },
    { name: 'Lucide Icons', icon: '🎯', color: 'text-purple-500' },
    { name: 'OpenWeather API', icon: '🌤️', color: 'text-green-500' }
  ];

  const stats = [
    { number: '20+', label: 'Quiz Questions', icon: Brain },
    { number: '30+', label: 'Gallery Images', icon: Image },
    { number: '100%', label: 'Responsive', icon: Smartphone },
    { number: 'Real-time', label: 'Weather Data', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-25 via-indigo-25 to-purple-25 pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <Sparkles className="text-white" size={48} />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-300 to-purple-300 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Advanced Interactive
            </span>
            <br />
            <span className="text-gray-700">Web Experience</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover a modern web application showcasing responsive design, interactive components, 
            and real-time API integration. Built with cutting-edge technologies for an exceptional user experience.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveSection('quiz')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg"
            >
              <Brain className="inline-block mr-2" size={24} />
              Start Quiz
            </button>
            <button
              onClick={() => setActiveSection('carousel')}
              className="bg-white/80 hover:bg-white/95 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/60 hover:border-purple-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg"
            >
              <Image className="inline-block mr-2" size={24} />
              View Gallery
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={feature.action}
                className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer group`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
                  <span>Explore</span>
                  <Zap className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/60 shadow-xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-700 mb-4">
              <Code className="inline-block mr-3 text-blue-600" size={40} />
              Built with Modern Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leveraging the latest web technologies to deliver exceptional performance and user experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div className={`font-semibold ${tech.color} group-hover:scale-105 transition-transform duration-300`}>
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Icon className="text-blue-600 mx-auto mb-4 hover:scale-110 transition-transform duration-300" size={32} />
                <div className="text-3xl font-bold text-gray-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 rounded-3xl p-12 border border-white/60 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce">
                <Target className="text-white" size={24} />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.1s' }}>
                <Globe className="text-white" size={24} />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
                <Palette className="text-white" size={24} />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-700 mb-4">
            Ready to Explore?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dive into our interactive features and experience the power of modern web development
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveSection('quiz')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
            >
              Test Your Knowledge
            </button>
            <button
              onClick={() => setActiveSection('weather')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg"
            >
              Check Weather
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;