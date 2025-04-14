import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Instagram, Globe2, Users, Zap, ArrowRight, Mail, 
  Phone, MapPin, Code2, Brain, Cpu, Database, Cloud, Shield, Menu, X
} from 'lucide-react';
import HeroBackground from './components/HeroBackground';
import PortfolioGrid from './components/PortfolioGrid';

const Logo = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="relative w-8 h-8"
    >
      <div className="absolute inset-0 bg-navy rounded-lg transform rotate-45"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-20 rounded-lg transform rotate-45"></div>
      <div className="absolute inset-[2px] bg-black rounded-lg transform rotate-45 flex items-center justify-center">
        <span className="text-white font-bold transform -rotate-45">D4</span>
      </div>
    </motion.div>
    <span className="text-xl font-bold">D4DX</span>
  </motion.div>
);

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'services', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
      setIsNavOpen(false);
    }
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleGetStartedClick = () => {
    // You can customize this to open a form, modal, or navigate to a specific page
    alert('Thank you for your interest! Our team will contact you shortly.');
  };

  const handlePortfolioClick = () => {
    // You can customize this to navigate to a portfolio page
    window.open('https://example.com/portfolio', '_blank');
  };

  const handleSocialClick = (platform: 'linkedin' | 'instagram' | 'github') => {
    // You can customize these URLs to your actual social media profiles
    const socialUrls = {
      linkedin: 'https://linkedin.com/company/d4dx',
      instagram: 'https://instagram.com/d4dx',
      github: 'https://github.com/d4dx'
    };
    
    window.open(socialUrls[platform], '_blank');
  };

  const stats = [
    { number: "100+", label: "Projects Delivered" },
    { number: "50+", label: "Global Clients" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const techStack = [
    { icon: <Code2 />, label: "Full Stack" },
    { icon: <Brain />, label: "AI/ML" },
    { icon: <Cpu />, label: "IoT" },
    { icon: <Database />, label: "Big Data" },
    { icon: <Cloud />, label: "Cloud Native" },
    { icon: <Shield />, label: "Cybersecurity" }
  ];

  const handleExploreWorkClick = () => {
    setIsPortfolioOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handlePortfolioClose = () => {
    setIsPortfolioOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'floating-nav py-4' : 'py-6'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <motion.div 
              onClick={() => scrollToSection('hero')}
              className="cursor-pointer"
            >
              <Logo />
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Work', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  whileHover={{ scale: 1.1 }}
                  className={`hover:text-white hover:font-bold transition-all cursor-pointer ${activeSection === item.toLowerCase() ? 'text-gray-400' : ''}`}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleGetStartedClick}
                className="px-6 py-2 bg-navy rounded-full font-medium"
              >
                Get Started
              </motion.button>
            </div>
            <button 
              className="md:hidden"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black z-40 pt-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6">
              {['Services', 'Work', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-2xl font-medium hover:text-white hover:font-bold transition-all cursor-pointer ${activeSection === item.toLowerCase() ? 'text-gray-400' : ''}`}
                >
                  {item}
                </a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleGetStartedClick}
                className="px-6 py-2 bg-navy rounded-full font-medium w-fit"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <HeroBackground />
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black pointer-events-none"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10 relative"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Engineering Bold <span className="text-gradient">Digital Futures</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              We design, build and elevate experiences that power the future.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={handleExploreWorkClick}
              className="px-8 py-3 bg-navy rounded-full font-medium flex items-center gap-2 hover:glow w-full md:w-auto"
            >
              Explore Our Work <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={handleContactClick}
              className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 w-full md:w-auto"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="services" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-4 bg-navy/5">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Technology Stack
          </motion.h2>
          <div className="tech-stack-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 
                }}
                className="glass-card p-6 rounded-xl text-center group"
              >
                <div className="mb-4 text-white relative">
                  <div className="absolute inset-0 animate-gradient-x bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  <div className="relative z-10 text-2xl">{tech.icon}</div>
                </div>
                <p className="font-medium">{tech.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="about" className="py-24 px-4">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-bold text-center mb-16"
          >
            What Drives Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe2 className="w-12 h-12 text-blue-500" />,
                title: "Innovation First",
                description: "We don't follow trends. We create them."
              },
              {
                icon: <Users className="w-12 h-12 text-purple-500" />,
                title: "People-Centered",
                description: "Human experience is at the core of our code."
              },
              {
                icon: <Zap className="w-12 h-12 text-amber-500" />,
                title: "Future-Proofing",
                description: "We future-ready every solution."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.2 
                }}
                whileHover={{ scale: 1.05 }}
                className="gradient-border group"
              >
                <div className="glass-card p-8 rounded-2xl text-center h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{value.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 px-4 bg-gradient-to-b from-black via-navy/5 to-black relative overflow-hidden">
        {/* Background lighting effect */}
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Work in Action
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "https://cdn.dribbble.com/userupload/10599580/file/original-0c14504b38c5b67ff867c8ce92697088.png?resize=1200x900",
                title: "AI Analytics Dashboard",
                description: "Real-time data visualization platform",
                tech: ["React", "D3.js", "TensorFlow"],
                link: "https://example.com/project1"
              },
              {
                image: "https://cdn.dribbble.com/userupload/10617130/file/original-5758b139cee8f24fae1f2abe4c3bc56c.png?resize=1200x900",
                title: "Smart City Platform",
                description: "IoT-based urban management system",
                tech: ["Vue.js", "Node.js", "MongoDB"],
                link: "https://example.com/project2"
              },
              {
                image: "https://cdn.dribbble.com/userupload/10617026/file/original-6963fb662a289c0bd6c2df1d49c48e8f.png?resize=1200x900",
                title: "Quantum Computing Interface",
                description: "Next-gen quantum system control",
                tech: ["React", "WebGL", "Python"],
                link: "https://example.com/project3"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  translateZ: 20 
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.5
                }}
                className="project-card relative group perspective-1000"
              >
                <div className="overflow-hidden rounded-2xl bg-navy/20 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                  <div className="aspect-video relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                      <div className="flex gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white hover:font-bold transition-all group-hover:translate-x-2"
                      >
                        View Project <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
              }}
              onClick={handlePortfolioClick}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full font-medium inline-flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              View Full Portfolio <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 overflow-hidden border-y border-white/10">
        <div className="marquee">
          <div className="marquee-content">
            {Array(2).fill(['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'GraphQL']).flat().map((tech, index) => (
              <span key={index} className="mx-8 text-2xl font-medium text-gray-400">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 tech-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Let's Build Something Legendary</h2>
            <p className="text-xl text-gray-400">
              Reach out to collaborate, brainstorm, or connect with the D4DX team.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="glass-card max-w-2xl mx-auto p-8 rounded-2xl"
          >
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Mail className="text-navy" />
                <a href="mailto:contact@d4dx.com" className="hover-glow">contact@d4dx.com</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-navy" />
                <a href="tel:+1234567890" className="hover-glow">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-navy" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-8">
              <motion.a
                whileHover={{ scale: 1.2 }}
                onClick={() => handleSocialClick('linkedin')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                onClick={() => handleSocialClick('instagram')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                onClick={() => handleSocialClick('github')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid Modal */}
      <AnimatePresence>
        {isPortfolioOpen && (
          <PortfolioGrid onClose={handlePortfolioClose} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;