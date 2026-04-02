import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const roles = ['Full-stack developer.', 'Artist.'];

function useInView(ref, threshold = 0.15) {
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

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16"
    >
      <div className="max-w-3xl">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.95] tracking-tight uppercase"
          style={{
            color: '#F0EEE6',
            transform: 'rotate(-2deg)',
            transformOrigin: 'left center',
          }}
        >
          Harshit
          <br />
          Hanabar
        </motion.h1>

        {/* Rotating role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 h-8 overflow-hidden"
        >
          <span
            className={`font-mono text-sm md:text-base inline-block transition-all duration-400 ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
            style={{ color: '#FF4500' }}
          >
            {roles[roleIndex]}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 font-mono text-xs md:text-sm leading-relaxed max-w-md"
          style={{ color: 'rgba(240, 238, 230, 0.7)' }}
        >
          I build things for the web. Fast, functional, and designed with intent.
          I also make art. Two modes, one person.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex items-center gap-5"
        >
          {/* GitHub */}
          <a
            href="https://github.com/devilOper09"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="GitHub"
            id="link-github"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200"
              style={{ color: 'rgba(240, 238, 230, 0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(240, 238, 230, 0.5)')
              }
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/harshithanabar"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="LinkedIn"
            id="link-linkedin"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200"
              style={{ color: 'rgba(240, 238, 230, 0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(240, 238, 230, 0.5)')
              }
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/harshithanabar09"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Instagram"
            id="link-instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200"
              style={{ color: 'rgba(240, 238, 230, 0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(240, 238, 230, 0.5)')
              }
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>

          {/* Spotify */}
          <a
            href="https://open.spotify.com/search/TenSick"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Spotify"
            id="link-spotify"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200"
              style={{ color: 'rgba(240, 238, 230, 0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(240, 238, 230, 0.5)')
              }
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15c3.5-1 7-1 10 1" />
              <path d="M7 12.5c4.5-1.5 9-1.5 13 1" />
              <path d="M6 10c5.5-2 11.5-2 16 1" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
