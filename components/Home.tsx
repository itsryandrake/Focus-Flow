import React, { useState, useEffect } from 'react';
import { Mode, FavoriteTrack } from '../types';
import { UserCircle, Sun, Moon, Headphones } from 'lucide-react';
import { StorageService } from '../services/storageService';
import ProfileModal from './ProfileModal';
import { useTheme } from '../contexts/ThemeContext';

interface HomeProps {
  onSelectMode: (mode: Mode) => void;
  onPlayFavorite?: (track: FavoriteTrack) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectMode, onPlayFavorite }) => {
  const [userName, setUserName] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const loadProfile = () => {
    const profile = StorageService.getProfile();
    setUserName(profile.name);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Molten ember mode icons — see design.md §5
  const cards = [
    {
      mode: Mode.FOCUS,
      icon: '/images/molten/brain.webp',
      label: 'Focus',
      desc: 'Deep work, creativity & studying',
    },
    {
      mode: Mode.MOTIVATION,
      icon: '/images/molten/bolt.webp',
      label: 'Motivation',
      desc: 'Energise your drive & ambition',
    },
    {
      mode: Mode.SUCCESS,
      icon: '/images/molten/star.webp',
      label: 'Success',
      desc: 'Hip-hop anthems for winners',
    },
    {
      mode: Mode.RELAX,
      icon: '/images/molten/coffee.webp',
      label: 'Relax',
      desc: 'Unwind & recharge',
    },
    {
      mode: Mode.MEDITATE,
      icon: '/images/molten/lotus.webp',
      label: 'Meditate',
      desc: 'Guided & unguided mindfulness',
    },
    {
      mode: Mode.SLEEP,
      icon: '/images/molten/moon.webp',
      label: 'Sleep',
      desc: 'Drift off & rest deeply',
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col transition-colors overflow-y-auto">
      {/* Ambient ember blobs — behind everything, ≤7% opacity */}
      <div className="ambient fixed inset-0 z-0" aria-hidden="true">
        <span className="w-[36rem] h-[36rem] -top-48 -left-40 bg-[#F74603]/[0.07] dark:bg-[#F74603]/[0.10]"></span>
        <span className="w-[28rem] h-[28rem] bottom-0 -right-32 bg-[#F74603]/[0.05] dark:bg-[#F74603]/[0.06]"></span>
      </div>

      {/* Header Bar */}
      <header className="bg-[var(--bg-secondary)] backdrop-blur-xl border-b border-[var(--border)] sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="ember-tile w-9 h-9 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              Focus<span className="text-[var(--accent)]">Mode</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F74603]/40"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              aria-label="Open profile"
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F74603]/40"
            >
              <UserCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="mb-4 md:mb-6">
          <p className="text-[var(--text-secondary)] text-sm md:text-base font-light">
            {userName ? `Welcome back, ${userName}` : 'Music for people who want to focus and get sh*t done.'}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 auto-rows-fr" style={{ minHeight: 'min(calc(80vh - 180px), 600px)' }}>
          {/* Focus - Featured large tile */}
          <button
            onClick={() => onSelectMode(Mode.FOCUS)}
            className="glass lift group relative col-span-2 lg:col-span-1 lg:row-span-2 rounded-2xl p-5 md:p-8 flex flex-col justify-between items-start text-left overflow-hidden min-h-[160px] md:min-h-0"
          >
            <img
              src={cards[0].icon}
              alt=""
              className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 relative z-10"
            />
            <div className="w-full relative z-10">
              <h2 className="text-xl md:text-3xl text-[var(--text-primary)] mb-1 md:mb-2">Focus</h2>
              <p className="text-sm md:text-base text-[var(--text-secondary)]">Deep work, creativity & studying</p>
            </div>
          </button>

          {/* Other modes - smaller tiles */}
          {cards.slice(1).map((card) => (
            <button
              key={card.mode}
              onClick={() => onSelectMode(card.mode)}
              className="glass lift group relative rounded-2xl p-4 md:p-6 flex flex-col justify-between items-start text-left overflow-hidden min-h-[140px] md:min-h-0"
            >
              <img
                src={card.icon}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_6px_18px_rgba(247,70,3,0.25)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 relative z-10"
              />
              <div className="w-full relative z-10">
                <h2 className="text-base md:text-xl text-[var(--text-primary)] mb-0.5">{card.label}</h2>
                <p className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-2">{card.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Ential credit — shared liquid-metal capsule, identical across all Ential free tools */}
      <footer className="relative z-10 mt-auto py-6 flex justify-center print:hidden">
        <div className="liquid-metal">
          <a
            href="https://ential.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#0c0c0d] px-5 py-2.5 text-xs font-medium text-stone hover:text-paper transition-colors"
          >
            ❤️ Made with Love + Code by <span className="text-ember">Ential</span>
          </a>
        </div>
      </footer>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onUpdate={loadProfile}
        onPlayTrack={onPlayFavorite}
      />
    </div>
  );
};

export default Home;