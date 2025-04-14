import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform powered by machine learning",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
    link: "#"
  },
  {
    id: 2,
    title: "Smart City Platform",
    description: "IoT-based urban management system",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    link: "#"
  },
  {
    id: 3,
    title: "Quantum Computing Interface",
    description: "Next-generation quantum computing visualization",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800",
    link: "#"
  },
  {
    id: 4,
    title: "Blockchain Trading Platform",
    description: "Secure and scalable cryptocurrency exchange",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=800",
    link: "#"
  },
  {
    id: 5,
    title: "AR Product Showcase",
    description: "Augmented reality product visualization",
    category: "AR/VR",
    image: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=800",
    link: "#"
  },
  {
    id: 6,
    title: "Cloud Security Suite",
    description: "Enterprise-grade cloud security solution",
    category: "Security",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800",
    link: "#"
  }
];

const categories = ["All", "AI/ML", "IoT", "Innovation", "Blockchain", "AR/VR", "Security"];

interface PortfolioGridProps {
  onClose: () => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Our Portfolio</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border ${
                selectedCategory === category
                  ? 'bg-navy border-navy text-white'
                  : 'border-white/20 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-navy hover:text-white transition-colors">
                      View Details <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-navy/20 p-8 rounded-2xl max-w-4xl w-full backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                    <span className="px-3 py-1 bg-navy/30 rounded-full text-sm">
                      {selectedProject.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <p className="text-gray-300 mb-6">{selectedProject.description}</p>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy rounded-full hover:bg-navy/80 transition-colors"
                >
                  Visit Project <ArrowRight size={16} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PortfolioGrid; 