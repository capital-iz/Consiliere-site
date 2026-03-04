import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  Play,
  Pause,
  Calendar,
  Mail,
  Phone,
  Music,
  Clock,
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
} from 'lucide-react';

const BRAND = {
  name: 'Consiliere',
  tagline: 'Atmospheric Deep House Architect',
  domain: 'valentinovibes.com',
  email: 'bookings@valentinovibes.com',
};

const NAV_ITEMS = [
  { label: 'Home', key: 'home', path: '/' },
  { label: 'Music', key: 'music', path: '/music' },
  { label: 'Bookings', key: 'bookings', path: '/bookings' },
  { label: 'Media', key: 'media', path: '/media' },
  { label: 'About', key: 'about', path: '/about' },
  { label: 'Contact', key: 'contact', path: '/contact' },
];

const SOCIAL_LINKS = {
  Instagram: 'https://www.instagram.com/',
  Facebook: 'https://www.facebook.com/',
  Twitter: 'https://x.com/',
  Youtube: 'https://www.youtube.com/',
};

const STREAMING_LINKS = {
  spotify: (release) => `https://open.spotify.com/search/${encodeURIComponent(`${BRAND.name} ${release.title}`)}`,
  apple: (release) => `https://music.apple.com/us/search?term=${encodeURIComponent(`${BRAND.name} ${release.title}`)}`,
  soundcloud: (release) => `https://soundcloud.com/search?q=${encodeURIComponent(`${BRAND.name} ${release.title}`)}`,
};

const RELEASES = [
  { id: 1, title: 'Neon Nights EP', year: '2026', type: 'EP', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=600&auto=format&fit=crop', desc: 'A journey through deep, synth-heavy soundscapes inspired by the underground club scene.' },
  { id: 2, title: 'Afterhours Sessions', year: '2025', type: 'Mix', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop', desc: '2 hours of pure melodic deep house. Featured on global underground radio.' },
  { id: 3, title: 'Velvet Groove', year: '2025', type: 'Single', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop', desc: 'A vocal deep house anthem featuring soul-drenched vocals and a driving bassline.' },
];

const PRESS_IMAGES = [
  'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621360811013-c76831f1628e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516280440502-61434c449339?q=80&w=1200&auto=format&fit=crop',
];

const normalizePath = (pathname) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.replace(/\/+$/, '');
};

const tabFromPath = (pathname) => {
  const normalized = normalizePath(pathname);
  const match = NAV_ITEMS.find((item) => item.path === normalized);
  return match ? match.key : 'home';
};

const pathFromTab = (tab) => {
  const match = NAV_ITEMS.find((item) => item.key === tab);
  return match ? match.path : '/';
};

const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

const SectionTitle = ({ title, subtitle, isDark }) => (
  <div className="mb-16 text-center md:text-left relative z-10">
    <h2 className={`text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-fuchsia-400 to-cyan-400' : 'from-fuchsia-600 to-cyan-600'} mb-4 uppercase`}>{title}</h2>
    {subtitle && <p className={`text-lg max-w-2xl font-light ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
  </div>
);

const AnimatedBackground = ({ isDark }) => (
  <div className={`fixed inset-0 z-[-1] overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#05010a]' : 'bg-slate-50'}`}>
    <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] blur-[120px] rounded-full animate-pulse duration-10000 ${isDark ? 'bg-fuchsia-600/20 mix-blend-screen' : 'bg-fuchsia-300/40 mix-blend-multiply'}`}></div>
    <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] blur-[120px] rounded-full animate-pulse duration-7000 ${isDark ? 'bg-cyan-600/10 mix-blend-screen' : 'bg-cyan-300/40 mix-blend-multiply'}`}></div>
    <div className={`absolute top-[40%] left-[40%] w-[30vw] h-[30vw] blur-[100px] rounded-full ${isDark ? 'bg-violet-600/10 mix-blend-screen' : 'bg-violet-300/40 mix-blend-multiply'}`}></div>
    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay ${isDark ? 'opacity-20 brightness-100 contrast-150' : 'opacity-[0.03] brightness-0 contrast-100'}`}></div>
  </div>
);

const Toast = ({ message, isVisible }) => (
  <div className={`fixed bottom-28 md:bottom-12 right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 z-[60] bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(217,70,239,0.3)] flex items-center gap-3 font-semibold transition-all duration-500 border border-white/20 backdrop-blur-md ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
    <CheckCircle size={20} className="text-cyan-300" />
    {message}
  </div>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState(() => tabFromPath(window.location.pathname));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', visible: false });
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const themeClass = {
    textMain: isDark ? 'text-white' : 'text-slate-900',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-600',
    textLight: isDark ? 'text-slate-300' : 'text-slate-700',
    card: isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl',
    cardHover: isDark ? 'hover:bg-white/10 hover:border-white/20' : 'hover:bg-white hover:border-slate-300 shadow-xl',
    border: isDark ? 'border-white/10' : 'border-slate-200',
    input: isDark ? 'bg-black/40 border-white/10 text-white focus:border-fuchsia-500 focus:bg-white/5' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-fuchsia-500 focus:bg-white',
    accentFuchsia: isDark ? 'text-fuchsia-400' : 'text-fuchsia-600',
    accentCyan: isDark ? 'text-cyan-400' : 'text-cyan-600',
    buttonPrimary: isDark ? 'bg-white text-black hover:bg-gradient-to-r hover:from-fuchsia-500 hover:to-cyan-500 hover:text-white' : 'bg-slate-900 text-white hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-cyan-600 hover:text-white',
    buttonSecondary: isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50',
    navBg: isDark ? 'bg-[#05010a]/80 border-white/10' : 'bg-white/90 border-slate-200 shadow-sm',
    menuBg: isDark ? 'bg-[#0a0514]/95 border-white/5' : 'bg-slate-50/95 border-slate-200',
    playerBg: isDark ? 'bg-[#0a0514]/90 border-white/10' : 'bg-white/95 border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]',
  };

  const showToast = (msg) => {
    setToastMessage({ text: msg, visible: true });
    setTimeout(() => setToastMessage({ text: '', visible: false }), 3500);
  };

  const openExternal = (url, msg) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    if (msg) {
      showToast(msg);
    }
  };

  const handleNav = (tab) => {
    const nextTab = tab.toLowerCase();
    const nextPath = pathFromTab(nextTab);

    if (normalizePath(window.location.pathname) !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setActiveTab(nextTab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (type, data = null) => setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: null, data: null });

  useEffect(() => {
    const savedTheme = localStorage.getItem('consiliere-theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('consiliere-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const onPopState = () => {
      setActiveTab(tabFromPath(window.location.pathname));
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const item = NAV_ITEMS.find((entry) => entry.key === activeTab);
    const sectionLabel = item ? item.label : 'Home';
    document.title = `${sectionLabel} | ${BRAND.name}`;
  }, [activeTab]);

  const openStream = (platform, release) => {
    const resolver = STREAMING_LINKS[platform];
    if (!resolver) {
      return;
    }

    const platformName = platform === 'apple' ? 'Apple Music' : platform === 'spotify' ? 'Spotify' : 'SoundCloud';
    openExternal(resolver(release), `Opening ${platformName}...`);
  };

  const goToAdminGateway = () => {
    window.location.href = '/admin-gateway';
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.5; // Simulate 100 seconds per track
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
      showToast(`Now Playing: ${track.title}`);
    }
  };

  // --- INTERACTIVE MODALS ---
  const ModalContainer = () => {
    if (!modal.isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
        <div className={`absolute inset-0 backdrop-blur-xl ${isDark ? 'bg-black/80' : 'bg-slate-900/60'}`} onClick={closeModal}></div>
        <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden scale-in transition-colors ${isDark ? 'bg-[#0f081c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]' : 'bg-white border border-slate-200 shadow-[0_0_50px_rgba(0,0,0,0.2)]'}`}>
          
          <button onClick={closeModal} className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}>
            <X size={20} />
          </button>

          {modal.type === 'gallery' && (
            <div className={`relative aspect-video sm:aspect-auto sm:h-[70vh] w-full flex items-center justify-center group ${isDark ? 'bg-black' : 'bg-slate-100'}`}>
              <img src={PRESS_IMAGES[modal.data]} alt="Gallery view" className="max-w-full max-h-full object-contain" />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setModal({ ...modal, data: modal.data > 0 ? modal.data - 1 : PRESS_IMAGES.length - 1 }) }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur transition-all border ${isDark ? 'bg-black/50 hover:bg-fuchsia-600/80 text-white border-white/10' : 'bg-white/80 hover:bg-fuchsia-500 text-slate-900 hover:text-white border-slate-200 shadow-md'}`}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setModal({ ...modal, data: modal.data < PRESS_IMAGES.length - 1 ? modal.data + 1 : 0 }) }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur transition-all border ${isDark ? 'bg-black/50 hover:bg-cyan-600/80 text-white border-white/10' : 'bg-white/80 hover:bg-cyan-500 text-slate-900 hover:text-white border-slate-200 shadow-md'}`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- SUB-VIEWS ---

  const HomeView = () => (
    <div className="animate-fade-in relative z-10">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12 px-6">
        <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
          <h1 className={`text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${isDark ? 'from-white via-slate-200 to-slate-500' : 'from-slate-900 via-slate-700 to-slate-500'} mb-6 uppercase drop-shadow-2xl`}>
            {BRAND.name}
          </h1>
          <p className={`text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-12 drop-shadow-lg ${themeClass.accentFuchsia}`}>
            {BRAND.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <button 
              onClick={() => handleNav('music')}
              className={`w-full sm:w-auto px-10 py-5 font-black uppercase tracking-wider hover:scale-105 transition-all rounded-xl flex items-center justify-center gap-3 ${themeClass.buttonPrimary}`}
            >
              <Play size={20} fill="currentColor" /> Enter The Sound
            </button>
            <button 
              onClick={() => handleNav('bookings')}
              className={`w-full sm:w-auto px-10 py-5 backdrop-blur-md font-black uppercase tracking-wider transition-all rounded-xl flex items-center justify-center gap-3 border ${themeClass.buttonSecondary}`}
            >
              <Calendar size={20} /> Book Consiliere
            </button>
          </div>
        </div>
      </div>

      {/* Quick Highlights - Neumorphic Cards */}
      <div className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          className={`group relative backdrop-blur-xl p-10 rounded-3xl border transition-all cursor-pointer overflow-hidden shadow-2xl ${isDark ? 'bg-[#130a28]/60 border-white/5 hover:border-fuchsia-500/50' : 'bg-white/80 border-slate-200 hover:border-fuchsia-400/50'}`} 
          onClick={() => handleNav('music')}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[80px] group-hover:bg-fuchsia-600/20 transition-all"></div>
          <div className="relative z-10">
            <h3 className={`text-xs font-black tracking-[0.2em] uppercase mb-4 ${themeClass.accentFuchsia}`}>Latest Release</h3>
            <h4 className={`text-4xl font-black mb-4 uppercase ${themeClass.textMain}`}>Neon Nights EP</h4>
            <p className={`mb-8 text-lg font-light leading-relaxed ${themeClass.textMuted}`}>Experience the latest journey through deep, dubby soundscapes. Streaming globally now.</p>
            <div className={`inline-flex items-center gap-3 font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 text-white group-hover:bg-fuchsia-600 group-hover:border-fuchsia-500' : 'bg-slate-50 border-slate-200 text-slate-800 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:border-fuchsia-400'}`}>
              Stream Now <ArrowRight size={16} />
            </div>
          </div>
        </div>
        
        <div 
          className={`group relative backdrop-blur-xl p-10 rounded-3xl border transition-all cursor-pointer overflow-hidden shadow-2xl ${isDark ? 'bg-[#130a28]/60 border-white/5 hover:border-cyan-500/50' : 'bg-white/80 border-slate-200 hover:border-cyan-400/50'}`} 
          onClick={() => handleNav('bookings')}
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] group-hover:bg-cyan-600/20 transition-all"></div>
          <div className="relative z-10">
            <h3 className={`text-xs font-black tracking-[0.2em] uppercase mb-4 ${themeClass.accentCyan}`}>Direct Booking</h3>
            <h4 className={`text-4xl font-black mb-4 uppercase ${themeClass.textMain}`}>Bring The Sound</h4>
            <p className={`mb-8 text-lg font-light leading-relaxed ${themeClass.textMuted}`}>Bring the architecture to your city. Official booking requests and tech riders available here.</p>
            <div className={`inline-flex items-center gap-3 font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-full border transition-all ${isDark ? 'bg-white/5 border-white/10 text-white group-hover:bg-cyan-600 group-hover:border-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-800 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-400'}`}>
              Book Now <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MusicView = () => (
    <div className="py-32 px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
      <SectionTitle title="Discography" subtitle="Explore the catalog. No sales, just pure auditory experiences." isDark={isDark} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RELEASES.map((release) => (
          <div key={release.id} className={`rounded-3xl overflow-hidden group transition-all border ${themeClass.card} ${isDark ? 'hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'hover:border-slate-300 hover:shadow-2xl'}`}>
            <div className={`relative aspect-square overflow-hidden ${isDark ? 'bg-[#0f081c]' : 'bg-slate-100'}`}>
              <img src={release.cover} alt={release.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-lighten" />
              <div className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-80 ${isDark ? 'from-[#0f081c] via-transparent' : 'from-slate-100/50 via-transparent'}`}></div>
              
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm ${isDark ? 'bg-black/40' : 'bg-white/40'}`}>
                <button 
                  onClick={() => togglePlay(release)}
                  className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_30px_rgba(217,70,239,0.5)]"
                >
                  {currentTrack?.id === release.id && isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
                </button>
              </div>
            </div>
            
            <div className="p-8 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-2xl font-black uppercase tracking-tight ${themeClass.textMain}`}>{release.title}</h3>
                <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border ${isDark ? 'bg-white/10 text-white border-white/5' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>{release.type}</span>
              </div>
              <p className={`text-sm font-bold mb-4 ${themeClass.accentFuchsia}`}>{release.year}</p>
              <p className={`text-sm leading-relaxed font-light mb-8 ${themeClass.textMuted}`}>{release.desc}</p>
              
              <div className={`pt-6 border-t ${themeClass.border}`}>
                <p className={`text-xs uppercase tracking-widest mb-4 font-bold ${themeClass.textMuted}`}>Available Everywhere</p>
                <div className="flex gap-3">
                  <button onClick={() => openStream('spotify', release)} className={`flex-1 py-3 border rounded-xl transition-all flex justify-center items-center ${isDark ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] hover:border-[#1DB954]/50' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#1DB954]/10 hover:text-[#1DB954] hover:border-[#1DB954]/30'}`} title="Spotify"><Music size={20} /></button>
                  <button onClick={() => openStream('apple', release)} className={`flex-1 py-3 border rounded-xl transition-all flex justify-center items-center ${isDark ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-[#FA243C]/20 hover:text-[#FA243C] hover:border-[#FA243C]/50' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#FA243C]/10 hover:text-[#FA243C] hover:border-[#FA243C]/30'}`} title="Apple Music"><Play size={20} /></button>
                  <button onClick={() => openStream('soundcloud', release)} className={`flex-1 py-3 border rounded-xl transition-all flex justify-center items-center ${isDark ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-[#FF5500]/20 hover:text-[#FF5500] hover:border-[#FF5500]/50' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#FF5500]/10 hover:text-[#FF5500] hover:border-[#FF5500]/30'}`} title="SoundCloud"><Clock size={20} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BookingsView = () => {
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus('loading');

      const formData = Object.fromEntries(new FormData(e.target).entries());

      try {
        const response = await fetch('/bookings/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-TOKEN': csrfToken(),
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({ message: 'Unable to submit booking request.' }));
          throw new Error(payload.message || 'Unable to submit booking request.');
        }

        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } catch (error) {
        setStatus('idle');
        showToast(error.message || 'Booking request failed. Please retry.');
      }
    };

    return (
      <div className="py-32 px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
        <SectionTitle title="Bookings" subtitle="Bring the architecture to your city. Official booking requests only." isDark={isDark} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 p-8 md:p-12 rounded-3xl relative overflow-hidden border ${themeClass.card}`}>
            
            {status === 'loading' && (
              <div className={`absolute inset-0 backdrop-blur-md z-20 flex flex-col items-center justify-center ${isDark ? 'bg-[#0a0514]/90' : 'bg-white/90'}`}>
                <div className={`w-16 h-16 border-4 rounded-full animate-spin mb-6 ${isDark ? 'border-white/10 border-t-fuchsia-500' : 'border-slate-200 border-t-fuchsia-500'}`}></div>
                <h3 className={`text-xl font-bold tracking-widest uppercase ${themeClass.textMain}`}>Processing Request...</h3>
              </div>
            )}

            {status === 'success' && (
              <div className={`absolute inset-0 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 ${isDark ? 'bg-[#0a0514]/90' : 'bg-white/90'}`}>
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className={`text-3xl font-black uppercase tracking-wider mb-4 ${themeClass.textMain}`}>Request Sent</h3>
                <p className={`text-lg ${themeClass.textMuted}`}>Management will review your inquiry and contact you via {BRAND.email} within 48 hours.</p>
                <button onClick={() => setStatus('idle')} className={`mt-8 px-8 py-3 font-bold rounded-xl transition-colors ${themeClass.buttonSecondary}`}>Book Another Date</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.accentFuchsia}`}>Event Date</label>
                  <input required name="event_date" type="date" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.accentFuchsia}`}>City / Country</label>
                  <input required name="city_country" type="text" placeholder="e.g. Frankfurt, DE" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.accentCyan}`}>Venue / Promoter</label>
                  <input required name="venue_promoter" type="text" placeholder="Venue Name" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.accentCyan}`}>Estimated Capacity</label>
                  <select required name="estimated_capacity" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all appearance-none cursor-pointer ${themeClass.input}`}>
                    <option value="" className={isDark ? "bg-zinc-900" : "bg-white"}>Select capacity</option>
                    <option value="100-500" className={isDark ? "bg-zinc-900" : "bg-white"}>Intimate (100 - 500)</option>
                    <option value="500-1000" className={isDark ? "bg-zinc-900" : "bg-white"}>Club (500 - 1,000)</option>
                    <option value="1000+" className={isDark ? "bg-zinc-900" : "bg-white"}>Festival (1,000+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.textMuted}`}>Offer Range (EUR/USD)</label>
                <input required name="offer_range" type="text" placeholder="Estimated budget" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.textMuted}`}>Your Name</label>
                  <input required name="contact_name" type="text" placeholder="John Doe" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
                </div>
                <div>
                  <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.textMuted}`}>Official Email</label>
                  <input required name="contact_email" type="email" placeholder="john@venue.com" className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all ${themeClass.input}`} />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold tracking-widest uppercase mb-2 ${themeClass.textMuted}`}>Additional Notes</label>
                <textarea name="notes" rows="4" placeholder="Event concept, lineup details..." className={`w-full px-5 py-4 rounded-xl focus:outline-none transition-all resize-none ${themeClass.input}`}></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-black uppercase tracking-widest py-5 rounded-xl hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:scale-[1.02] transition-all flex justify-center items-center gap-3">
                Submit Request <ArrowRight size={20} />
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className={`p-8 rounded-3xl border ${themeClass.card}`}>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <Phone className="text-emerald-500"/>
              </div>
              <h3 className={`text-2xl font-black mb-4 uppercase ${themeClass.textMain}`}>Direct Line</h3>
              <p className={`mb-8 font-light leading-relaxed ${themeClass.textMuted}`}>For last-minute festival replacements or urgent inquiries, message management directly.</p>
              <button 
                onClick={() => openExternal(`https://wa.me/4915123456789?text=${encodeURIComponent(`Hi ${BRAND.name} Management, I have an urgent booking inquiry.`)}`, 'Opening WhatsApp...')}
                className="w-full border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500 hover:text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-3"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MediaView = () => {
    return (
      <div className="py-32 px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <SectionTitle title="Gallery" subtitle="Visuals, live sets, and official press assets." isDark={isDark} />
        </div>

        <div>
          <h3 className={`text-xs font-black mb-6 uppercase tracking-[0.3em] flex items-center gap-4 ${themeClass.accentCyan}`}>
            <div className={`w-8 h-px ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div> Official Photography
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PRESS_IMAGES.map((img, i) => (
              <div key={i} className={`aspect-square rounded-2xl overflow-hidden cursor-pointer relative group border ${isDark ? 'bg-[#0a0514] border-white/5' : 'bg-slate-200 border-slate-300'}`} onClick={() => openModal('gallery', i)}>
                <img src={img} alt={`Press ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-lighten" />
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-8 text-white font-bold">
                  <ImageIcon size={32} className="mb-2 drop-shadow-lg" />
                  <span className="text-sm uppercase tracking-widest">View High-Res</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AboutView = () => (
    <div className="py-32 px-6 max-w-7xl mx-auto animate-fade-in relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600 to-cyan-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
          <img src="https://images.unsplash.com/photo-1520626338162-43ce9eb84013?q=80&w=1000&auto=format&fit=crop" alt="Profile" className={`relative rounded-3xl shadow-2xl w-full grayscale mix-blend-luminosity border group-hover:grayscale-0 transition-all duration-1000 ${isDark ? 'border-white/10' : 'border-slate-200'}`} />
        </div>
        
        <div className={`space-y-10 p-10 rounded-3xl border ${themeClass.card}`}>
          <SectionTitle title="The Story" subtitle="" isDark={isDark} />
          
          <div className={`text-lg font-light leading-relaxed space-y-6 ${themeClass.textLight}`}>
            <p>
              Born in the heart of Frankfurt's legendary electronic music culture, <strong className={`font-black ${themeClass.textMain}`}>{BRAND.name}</strong> represents the uncompromising depth of modern house sound.
            </p>
            <p>
              His approach is methodical and atmospheric. He doesn't just play tracks; he builds <span className={`font-medium ${themeClass.accentCyan}`}>sonic architectures</span> designed to move bodies and elevate minds on the dancefloor.
            </p>
            <p>
              With a philosophy rooted in patience, sub-bass frequencies, and nostalgic analog textures, he has become a trusted selector for promoters demanding authentic, immersive experiences.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-8 pt-10 border-t ${themeClass.border}`}>
             <div>
               <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 mb-2">10<span className="text-3xl">+</span></p>
               <p className={`text-xs uppercase tracking-[0.2em] font-bold ${themeClass.textMuted}`}>Years Active</p>
             </div>
             <div>
               <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-2">50<span className="text-3xl">+</span></p>
               <p className={`text-xs uppercase tracking-[0.2em] font-bold ${themeClass.textMuted}`}>Cities Played</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactView = () => {
    const handleNewsletter = async (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target).entries());

      try {
        const response = await fetch('/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-CSRF-TOKEN': csrfToken(),
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({ message: 'Unable to request access right now.' }));
          throw new Error(payload.message || 'Unable to request access right now.');
        }

        showToast('Access Granted! Check your email for the exclusive download link.');
        e.target.reset();
      } catch (error) {
        showToast(error.message || 'Subscription failed. Please retry.');
      }
    };

    return (
      <div className="py-32 px-6 max-w-5xl mx-auto animate-fade-in relative z-10 text-center">
        <SectionTitle title="Connect" subtitle="Direct lines of communication and exclusive community access." isDark={isDark} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 mt-12">
          <a href={`mailto:${BRAND.email}`} onClick={() => showToast('Opening mail client...')} className={`p-10 rounded-3xl flex flex-col items-center justify-center transition-all group border ${themeClass.card} ${themeClass.cardHover}`}>
            <div className="w-16 h-16 rounded-full bg-fuchsia-500/10 flex items-center justify-center mb-6 group-hover:bg-fuchsia-500/20 transition-colors">
              <Mail size={28} className={themeClass.accentFuchsia} />
            </div>
            <h4 className={`font-black text-xl mb-2 uppercase tracking-wide ${themeClass.textMain}`}>Management</h4>
            <p className={`text-sm ${themeClass.textMuted}`}>{BRAND.email}</p>
          </a>
          
          <a href="https://wa.me/4915123456789" target="_blank" rel="noreferrer" onClick={() => showToast('Opening WhatsApp...')} className={`p-10 rounded-3xl flex flex-col items-center justify-center transition-all group border ${themeClass.card} ${themeClass.cardHover}`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
              <Phone size={28} className="text-emerald-500" />
            </div>
            <h4 className={`font-black text-xl mb-2 uppercase tracking-wide ${themeClass.textMain}`}>WhatsApp</h4>
            <p className={`text-sm ${themeClass.textMuted}`}>Direct Message Line</p>
          </a>

          <a href="/media" onClick={(e) => { e.preventDefault(); handleNav('media'); }} className={`p-10 rounded-3xl flex flex-col items-center justify-center transition-all group border ${themeClass.card} ${themeClass.cardHover}`}>
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-colors">
              <ImageIcon size={28} className={themeClass.accentCyan} />
            </div>
            <h4 className={`font-black text-xl mb-2 uppercase tracking-wide ${themeClass.textMain}`}>Gallery</h4>
            <p className={`text-sm ${themeClass.textMuted}`}>High-Res Assets</p>
          </a>
        </div>

        <div className="relative p-[1px] rounded-3xl overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
           <div className={`p-12 md:p-16 rounded-3xl relative z-10 text-left flex flex-col md:flex-row items-center gap-12 ${isDark ? 'bg-[#0f081c]' : 'bg-white'}`}>
             <div className="flex-1">
               <h3 className={`text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight ${themeClass.textMain}`}>The Inner Circle</h3>
               <p className={`font-light text-lg mb-8 leading-relaxed ${themeClass.textMuted}`}>Join the private network. Receive early access to unreleased dubs, private mix downloads, and secret gig locations before anyone else.</p>
             </div>
             
             <form onSubmit={handleNewsletter} className="w-full md:w-auto flex-1 flex flex-col gap-4">
               <input required name="email" type="email" placeholder="Enter your email address" className={`w-full px-6 py-5 rounded-xl focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 text-white focus:border-white focus:bg-white/10 placeholder:text-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-fuchsia-500 focus:bg-white placeholder:text-slate-400'}`} />
               <button type="submit" className={`w-full py-5 font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] ${themeClass.buttonPrimary}`}>
                 Request Access
               </button>
             </form>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ${isDark ? 'bg-[#05010a] text-slate-200 selection:bg-fuchsia-500 selection:text-white' : 'bg-slate-50 text-slate-800 selection:bg-fuchsia-500 selection:text-white'}`}>
      <AnimatedBackground isDark={isDark} />
      <ModalContainer />
      
      {/* Navigation Header */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${activeTab !== 'home' ? `backdrop-blur-xl border-b py-4 ${themeClass.navBg}` : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className={`text-2xl font-black tracking-tighter uppercase cursor-pointer flex items-center gap-3 transition-colors ${isDark ? 'text-white hover:text-fuchsia-400' : 'text-slate-900 hover:text-fuchsia-600'}`}
            onClick={() => handleNav('home')}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-cyan-600 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.5)]">
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-[#05010a]' : 'bg-white'}`}></div>
            </div>
            {BRAND.name.split(' ')[0]}
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-8 px-8 py-3 rounded-full border backdrop-blur-md ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.key}
                  onClick={() => handleNav(item.key)}
                  className={`text-xs font-black tracking-[0.2em] uppercase transition-all ${activeTab === item.key ? `${themeClass.accentFuchsia} drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]` : `${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle - Desktop */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-3 rounded-full border backdrop-blur-md transition-colors ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/20' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggles */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border backdrop-blur-md transition-colors ${isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className={`p-2 rounded-lg border backdrop-blur-md ${isDark ? 'bg-white/10 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 backdrop-blur-3xl z-30 transition-all duration-500 flex flex-col pt-32 px-8 border-r md:hidden ${themeClass.menuBg} ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        {NAV_ITEMS.map((item, index) => (
          <button 
            key={item.key}
            onClick={() => handleNav(item.key)}
            className={`text-4xl font-black uppercase text-left py-6 border-b transition-all ${isDark ? 'border-white/5 text-slate-400 hover:text-fuchsia-400 hover:pl-4' : 'border-slate-200 text-slate-600 hover:text-fuchsia-600 hover:pl-4'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="min-h-screen pt-10 pb-32">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'music' && <MusicView />}
        {activeTab === 'bookings' && <BookingsView />}
        {activeTab === 'media' && <MediaView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      {/* Global Footer */}
      <footer className={`border-t py-16 px-6 relative z-10 ${isDark ? 'bg-[#05010a] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
               <ShieldCheck size={14} className="text-slate-400" />
             </div>
             <div>
               <p className={`font-bold text-sm uppercase tracking-widest ${themeClass.textMain}`}>{BRAND.name}</p>
               <p className="text-slate-500 text-xs">(c) 2026. Official Artist Portal.</p>
             </div>
          </div>
          <div className="flex gap-4">
             {['Instagram', 'Facebook', 'Twitter', 'Youtube'].map((social, i) => {
               const icons = [<Instagram size={18}/>, <Facebook size={18}/>, <Twitter size={18}/>, <Youtube size={18}/>];
               return (
                 <a key={social} href={SOCIAL_LINKS[social]} target="_blank" rel="noreferrer" onClick={() => showToast(`Opening ${social}...`)} className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-white border-slate-300 text-slate-600 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-400 shadow-sm'}`}>
                   {icons[i]}
                 </a>
               );
             })}
          </div>
          <button onClick={goToAdminGateway} className={`px-6 py-2 rounded-full border text-xs transition-all font-mono uppercase tracking-widest ${isDark ? 'bg-white/5 border-white/10 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50' : 'bg-white border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-500/50 shadow-sm'}`}>
             [ Admin Login ]
          </button>
        </div>
      </footer>

      {/* Advanced Audio Player */}
      <div className={`fixed bottom-0 left-0 w-full backdrop-blur-2xl border-t transform transition-all duration-700 z-50 ${themeClass.playerBg} ${currentTrack ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        
        {/* Progress Bar Container */}
        <div className={`h-1.5 w-full cursor-pointer relative group ${isDark ? 'bg-white/5' : 'bg-slate-200'}`} onClick={(e) => {
          const bounds = e.currentTarget.getBoundingClientRect();
          const p = ((e.clientX - bounds.left) / bounds.width) * 100;
          setProgress(Math.max(0, Math.min(100, p)));
        }}>
          <div className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all duration-300 relative shadow-[0_0_10px_rgba(6,182,212,0.8)]" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-[0_0_10px_white]"></div>
          </div>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto h-24">
          
          <div className="flex items-center gap-6 w-1/3">
             {currentTrack && (
               <div className={`relative w-16 h-16 rounded-xl overflow-hidden shadow-lg hidden sm:block border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                 <img src={currentTrack.cover} alt="Cover" className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''} rounded-full absolute inset-0 m-auto w-[90%] h-[90%]`} />
               </div>
             )}
             <div className="truncate">
               <h4 className={`font-black text-lg uppercase tracking-tight truncate ${themeClass.textMain}`}>{currentTrack?.title}</h4>
               <p className={`text-xs font-bold uppercase tracking-widest ${themeClass.accentFuchsia}`}>{BRAND.name}</p>
             </div>
          </div>
          
          <div className="flex items-center justify-center w-1/3 gap-6">
            <button className={`transition-colors hidden sm:block ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}><ChevronLeft size={24} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:scale-110 shadow-md'}`}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            <button className={`transition-colors hidden sm:block ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}><ChevronRight size={24} /></button>
          </div>

          <div className="w-1/3 flex justify-end items-center gap-6">
             {/* Simulated Visualizer */}
             <div className="hidden md:flex gap-1 h-8 items-end opacity-70">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 rounded-t-sm transition-all duration-150 ${isPlaying ? 'animate-pulse' : 'h-1'} ${isDark ? 'bg-cyan-400' : 'bg-cyan-500'}`} style={{ height: isPlaying ? `${Math.random() * 100 + 20}%` : '4px', animationDelay: `${i * 0.1}s` }}></div>
                ))}
             </div>
             
             <button onClick={() => { setCurrentTrack(null); setIsPlaying(false); }} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${isDark ? 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border-slate-200'}`}>
               <X size={18} />
             </button>
          </div>
        </div>
      </div>

      <Toast message={toastMessage.text} isVisible={toastMessage.visible} />
    </div>
  );
}

