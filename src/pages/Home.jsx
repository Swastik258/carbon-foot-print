import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-50">
      {/* 🌿 Enhanced Navigation Bar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 group">
  {/* Logo Image - Made it round */}
  <img 
    src={logo1}
    alt="Emberate Logo"
    className="h-16 w-16 object-cover rounded-full border-2 border-emerald-200 shadow-sm"
  />
  {/* Text Logo - Enhanced styling */}
  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent hover:from-green-500 hover:to-emerald-600 transition-all duration-300">
    Emberate
  </span>
</div>
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Features', 'Tips', 'Community', 'Calculator'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-emerald-700 hover:text-emerald-600 transition-all duration-300 font-medium flex items-center gap-1 hover:-translate-y-0.5"
              >
                <span className="opacity-70">🌿</span>
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => navigate("/signup")} 
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:from-emerald-600 hover:to-green-600 flex items-center gap-2"
            >
              <span>🌍 Join</span>
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="border-2 border-emerald-500 text-emerald-600 px-6 py-2 rounded-full hover:bg-emerald-50 transition-colors font-medium flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>🌱 Login</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full w-full bg-white/95 backdrop-blur-sm border-b border-emerald-100">
            <div className="px-4 py-6 flex flex-col items-center space-y-4">
              {['Features', 'Tips', 'Community', 'Calculator'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-emerald-700 text-lg w-full text-center py-2 hover:bg-emerald-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-4 w-full max-w-xs">
                <button 
                  onClick={() => {navigate("/signup"); setIsMenuOpen(false);}}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-full shadow-lg hover:scale-105"
                >
                  🌍 Join Community
                </button>
                <button 
                  onClick={() => {navigate("/login"); setIsMenuOpen(false);}}
                  className="border-2 border-emerald-500 text-emerald-600 py-3 rounded-full hover:bg-emerald-50"
                >
                  🌱 Login
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🌳 Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 to-emerald-900/40" />
        </div>
        
        {/* Animated Leaf Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern-2.png')] animate-leaf-flow"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg space-y-4">
            <div className="animate-float">🌎</div>
            <div>Track Your Carbon Footprint,</div>
            <span className="text-emerald-300 bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
              Save the Planet!
            </span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light text-emerald-100 max-w-3xl mx-auto">
            Join 1M+ eco-warriors making sustainable choices that truly matter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 sm:px-8 sm:py-4 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 group mx-auto"
              onClick={() => navigate("/signup")}
            >
              <span className="text-sm sm:text-base">Get Started</span>
              <span className="group-hover:rotate-45 transition-transform">🚀</span>
            </button>
            <button className="border-2 border-emerald-300 hover:bg-emerald-300/10 px-6 py-3 sm:px-8 sm:py-4 rounded-full transform transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
              <span className="text-sm sm:text-base">Learn More</span>
              <span className="text-xl">📘</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🌊 Enhanced Wave Divider */}
      <div className="relative h-24 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-transparent"></div>
        <div className="wave-divider"></div>
      </div>

      {/* 🎥 Enhanced Video Section */}
      <section className="py-20 px-4 bg-emerald-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
              <span className="animate-bounce">🌿</span>
              Earth's Story
              <span className="animate-pulse">🌍</span>
            </h2>
            <p className="text-emerald-600 max-w-2xl mx-auto text-lg md:text-xl">
              Witness the power of collective environmental action
            </p>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-emerald-100 mx-auto max-w-4xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-300">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/G4H1N_yXBiA"
              title="Sustainability Video"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 border-8 border-white/20 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 🌳 Enhanced Interactive Dashboard */}
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
              <span>📊</span>
              Living Dashboard
              <span className="text-3xl animate-spin-slow">🌱</span>
            </h2>
            <p className="text-emerald-600 max-w-xl mx-auto text-lg md:text-xl">
              Your environmental impact visualized through nature's lens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Forest Saved", value: "2.8 Acres", emoji: "🌳", color: "bg-emerald-100" },
              { title: "Clean Energy", value: "1.2MWh", emoji: "☀️", color: "bg-amber-100" },
              { title: "Water Preserved", value: "35KL", emoji: "💧", color: "bg-blue-100" }
            ].map((metric, index) => (
              <div 
                key={index} 
                className={`${metric.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform">{metric.emoji}</div>
                  <div className="text-emerald-600 font-medium">▲ {(index+1)*5}%</div>
                </div>
                <div className="text-3xl font-bold text-emerald-900">{metric.value}</div>
                <p className="text-emerald-600 mt-2 text-lg">{metric.title}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-6 rounded-2xl shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
              <div className="h-64 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-4 relative">
                <div className="h-full bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-600">
                  <div className="animate-pulse text-lg">📈 Interactive Growth Chart</div>
                </div>
              </div>
              <p className="text-center mt-4 text-emerald-600">Monthly Progress</p>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-2xl shadow-inner">
              <div className="h-64 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-4 flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl animate-bounce">🌍</div>
                <div className="text-emerald-600 text-center text-lg">
                  Community Impact<br/>
                  <span className="text-2xl font-bold">1.2M+ Trees Planted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Enhanced Features Section */}
      <section className="py-20 px-4 bg-emerald-50 relative" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4 flex items-center justify-center gap-3">
              <span className="animate-spin-slow">🌐</span>
              Green Ecosystem
              <span className="text-3xl">✨</span>
            </h2>
            <p className="text-emerald-600 max-w-xl mx-auto text-lg md:text-xl">
              Integrated tools for sustainable living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Carbon Tracker", 
                desc: "Real-time emission monitoring",
                icon: "🌳",
                gradient: "from-green-100 to-emerald-100"
              },
              { 
                title: "Eco Challenges", 
                desc: "Weekly sustainability goals",
                icon: "🏆",
                gradient: "from-amber-100 to-orange-100"
              },
              { 
                title: "Green Network", 
                desc: "Global eco-community",
                icon: "🌍",
                gradient: "from-blue-100 to-cyan-100"
              },
              { 
                title: "Eco Market", 
                desc: "Sustainable products",
                icon: "🛍️",
                gradient: "from-purple-100 to-fuchsia-100"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
              >
                <div className="text-6xl mb-6 transform group-hover:rotate-12 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-3">{feature.title}</h3>
                <p className="text-emerald-600 text-lg">{feature.desc}</p>
                <div className="mt-6 border-t border-emerald-100 pt-4">
                  <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 font-medium">
                    Explore
                    <span className="text-xl animate-pulse">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 Enhanced Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaves-pattern-2.png')] opacity-10 animate-leaf-drift"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl animate-bounce-slow">🌱</span>
                <span className="text-xl font-bold">Emberate</span>
              </div>
              <p className="text-emerald-200 text-lg">
                "The Earth does not belong to us: we belong to the Earth."
              </p>
            </div>

            {/* Impact Column */}
            <div>
              <h4 className="text-lg font-bold mb-4">Our Impact</h4>
              <ul className="space-y-2">
                {['1.2M+ Trees Planted', '350K+ Members', '95% Renewables', 'Carbon Neutral'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-emerald-200 hover:text-white transition-colors text-lg">
                    <span>🌿</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: '🐦', label: 'Twitter' },
                  { icon: '📸', label: 'Instagram' },
                  { icon: '💼', label: 'LinkedIn' },
                  { icon: '🎥', label: 'YouTube' }
                ].map((social, index) => (
                  <button 
                    key={index}
                    className="text-2xl hover:scale-110 transition-transform text-emerald-200 hover:text-white relative group"
                    title={social.label}
                  >
                    {social.icon}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-emerald-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {social.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-4">Stay Green</h4>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-emerald-800/50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
                />
                <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors text-lg flex items-center justify-center gap-2">
                  Join 🌱
                </button>
              </div>
                          </div>
          </div>

          <div className="border-t border-emerald-800 pt-8 text-center">
            <p className="text-emerald-400">
              © 2024 Emberate. Nurturing nature, nurturing life 🌍
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .wave-divider {
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1440 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,101.3C672,85,768,107,864,138.7C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'/%3E%3C/svg%3E");
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
};

export default Home;