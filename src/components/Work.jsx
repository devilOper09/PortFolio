import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: 'SYNCLAB',
    description: 'Real-time collaboration platform.',
    tags: ['React', 'PostgreSQL'],
    status: 'In Progress',
  },
  {
    name: 'MARKETPLACE',
    description: 'Buy & sell goods platform.',
    tags: ['React', 'Express', 'PostgreSQL'],
    status: null,
  },
  {
    name: 'CHAT APP',
    description: 'Real-time messaging with rooms.',
    tags: ['Node.js', 'Socket.io'],
    status: null,
  },
  {
    name: 'WALLPAPER APP',
    description: 'API-powered wallpaper browser.',
    tags: ['React', 'REST API'],
    status: null,
  },
  {
    name: 'DRUM MACHINE',
    description: 'Browser-based interactive drum pad.',
    tags: ['JS', 'Web Audio API'],
    status: null,
  },
];

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative pl-4 py-5 pr-5 rounded-sm"
      style={{
        backgroundColor: 'rgba(240, 238, 230, 0.03)',
        borderLeft: '2px solid rgba(255, 69, 0, 0.3)',
        transition: 'border-color 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = 'rgba(255, 69, 0, 0.9)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = 'rgba(255, 69, 0, 0.3)';
      }}
      id={`project-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center gap-3">
        <h3
          className="font-mono text-sm md:text-base font-semibold uppercase tracking-wide"
          style={{ color: '#F0EEE6' }}
        >
          {project.name}
        </h3>
        {project.status && (
          <span
            className="font-mono text-[10px] uppercase tracking-wider"
            style={{ color: '#FF4500' }}
          >
            {project.status}
          </span>
        )}
      </div>
      <p
        className="mt-1.5 font-mono text-xs"
        style={{ color: 'rgba(240, 238, 230, 0.5)' }}
      >
        {project.description}
      </p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider"
            style={{
              color: 'rgba(240, 238, 230, 0.45)',
              border: '1px solid rgba(240, 238, 230, 0.1)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-10 py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-12"
          style={{ color: '#F0EEE6' }}
        >
          Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
