import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export default function Connect() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fieldClass =
    'form-field w-full bg-transparent font-mono text-xs md:text-sm py-3 px-0';

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative z-10 py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-12"
          style={{ color: '#F0EEE6' }}
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
          id="contact-form"
        >
          <input
            type="text"
            name="name"
            placeholder="NAME"
            value={formData.name}
            onChange={handleChange}
            required
            className={fieldClass}
            style={{ color: '#F0EEE6' }}
            id="field-name"
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className={fieldClass}
            style={{ color: '#F0EEE6' }}
            id="field-email"
          />
          <textarea
            name="message"
            placeholder="MESSAGE"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={`${fieldClass} resize-none`}
            style={{ color: '#F0EEE6' }}
            id="field-message"
          />

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="font-mono text-xs md:text-sm uppercase tracking-wider bg-transparent border-none p-0 transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#FF4500' }}
              id="btn-submit"
            >
              Send →
            </button>
            {submitted && (
              <span
                className="font-mono text-xs"
                style={{ color: 'rgba(240, 238, 230, 0.6)' }}
              >
                Message sent.
              </span>
            )}
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 font-mono text-[10px] md:text-xs"
          style={{ color: 'rgba(240, 238, 230, 0.3)' }}
        >
          Or reach me directly —{' '}
          <a
            href="mailto:harshithanabar09@gmail.com"
            className="transition-colors duration-200 hover:underline"
            style={{ color: 'rgba(240, 238, 230, 0.5)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FF4500')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(240, 238, 230, 0.5)')
            }
            id="link-direct-email"
          >
            harshithanabar09@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
