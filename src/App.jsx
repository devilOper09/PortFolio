import ParticleField from './components/ParticleField';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import Work from './components/Work';
import Connect from './components/Connect';

export default function App() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Background audio */}
      <AudioPlayer />

      {/* Particle background */}
      <ParticleField />

      {/* Content */}
      <main className="relative z-10">
        <Hero />
        <Work />
        <Connect />

        {/* Footer sliver */}
        <footer className="relative z-10 py-8 px-6 md:px-16 text-center">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{ color: 'rgba(240, 238, 230, 0.15)' }}
          >
            © {new Date().getFullYear()} Harshit Hanabar
          </p>
        </footer>
      </main>
    </div>
  );
}
