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
    <motion.div className="relative">
      <motion.img
        src="https://d4dx.co/wp-content/smush-webp/2024/10/Logo-final-copy-01-e1728989068232-2048x647.png.webp"
        alt="D4DX Logo"
        className="h-8 md:h-10 w-auto brightness-0 invert filter hover:brightness-110 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-gradient-x pointer-events-none"></div>
    </motion.div>
  </motion.div>
);

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-b from-black to-navy text-white">
      {/* Navigation */}
      <nav className="container fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                className="hover:text-white transition-all cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="tel:+919895804006"
              className="btn bg-navy"
            >
              <Phone size={18} /> Call Us
            </motion.a>
          </div>
          <button className="md:hidden touch-target" onClick={() => setIsNavOpen(!isNavOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="container py-20">
          <div className="nav-menu">
            {['Services', 'Work', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsNavOpen(false);
                }}
                className="text-xl hover:text-white transition-all cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="tel:+919895804006"
              className="btn bg-navy w-full text-center"
            >
              <Phone size={18} className="inline-block mr-2" /> Call Us
            </motion.a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="text-responsive max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Engineering Bold Digital Futures
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We transform ideas into powerful digital solutions
          </motion.p>
        </div>
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
      <section className="section-padding container" id="services">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Tech Stack</h2>
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
      <section className="section-padding container" id="work">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Work in Action</h2>
        <div className="portfolio-grid">
          {[
            {
              image: "https://i.ibb.co/VxKN3Rj/muhasabah.jpg",
              title: "Muhasabah",
              description: "Daily self-reflection and spiritual tracking app",
              tech: ["React Native", "Firebase", "Node.js"],
              link: "https://example.com/muhasabah"
            },
            {
              image: "https://i.ibb.co/CwLLxHD/tafheem.jpg",
              title: "Thafheem ul Quran",
              description: "Comprehensive Quran study and translation platform",
              tech: ["Flutter", "GraphQL", "MongoDB"],
              link: "https://example.com/tafheem"
            },
            {
              image: "https://i.ibb.co/xGV3W7P/quran-malayalam.jpg",
              title: "Al Quran Malayalam",
              description: "Malayalam translation and tafseer of the Quran",
              tech: ["React", "Express", "MySQL"],
              link: "https://example.com/quran-malayalam"
            },
            {
              image: "https://i.ibb.co/Jk8Gx3Q/janaza.jpg",
              title: "Janaza Guide",
              description: "Step-by-step guide for Islamic funeral rites",
              tech: ["React Native", "Redux", "Firebase"],
              link: "https://example.com/janaza-guide"
            },
            {
              image: "https://i.ibb.co/VpzB0Vk/lalithasaram.jpg",
              title: "Quran Lalithasaram",
              description: "Simplified Quran learning platform in Malayalam",
              tech: ["Flutter", "Node.js", "PostgreSQL"],
              link: "https://example.com/lalithasaram"
            },
            {
              image: "https://i.ibb.co/0MKznx8/hajj-guide.jpg",
              title: "Thanima Hajj Guide",
              description: "Complete Hajj and Umrah companion app",
              tech: ["React Native", "Express", "MongoDB"],
              link: "https://example.com/hajj-guide"
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
      <section className="section-padding container" id="contact">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="text-navy" />
              <a href="tel:+919895804006" className="hover-glow">+91 98958 04006</a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-navy" />
              <span>Calicut, Kerala, India</span>
            </div>
          </div>
          <form className="space-y-6">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
            <textarea rows={4} placeholder="Your Message" className="form-input" />
            <button type="submit" className="btn bg-navy w-full">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer container border-t border-gray-800">
        <div className="text-sm text-gray-400">
          © 2024 D4DX Innovations. All rights reserved.
        </div>
        <div className="flex justify-end gap-4">
          <a href="https://linkedin.com/company/d4dx" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin size={20} />
          </a>
          <a href="https://instagram.com/d4dx" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Instagram size={20} />
          </a>
          <a href="https://github.com/d4dx" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Github size={20} />
          </a>
        </div>
      </footer>

      {/* Portfolio Grid Modal */}
      <AnimatePresence>
        {isPortfolioOpen && (
          <PortfolioGrid onClose={handlePortfolioClose} />
        )}
      </AnimatePresence>
    </div>
  );
}