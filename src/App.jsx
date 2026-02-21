import React, { useState, useEffect } from 'react';
import './App.css';

const HEROES_DATA = {
  drstrange: {
    name: 'DR. STRANGE', color: '#805AD5', subtitle: '"Sorcerer Supreme"',
    desc: 'Stephen Strange. Gifted surgeon turned master of the mystic arts. Guardian of the Time Stone and protector of all timelines.',
    powers: 'Master sorcery, Cloak of Levitation, Time Stone, portal creation, and multiverse travel.',
    heroImg: '/heroes/dr strange.png', isTransparent: true, scale: 1.5, type: 'HERO',
    movies: [
      { name: 'Doctor Strange', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uGBVl3bFElGQgnQlZIoJIR66v7M.jpg', trailer: 'https://www.youtube.com/embed/HSzx-zryEgM', hint: 'Phase 3 | Origin' },
      { name: 'Multiverse of Madness', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', trailer: 'https://www.youtube.com/embed/aWzlQ2N6qqg', hint: 'Phase 4 | Horror' },
      { name: 'Infinity War', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChvYDf3tI1nc0pZqS9oP3MK.jpg', trailer: 'https://www.youtube.com/embed/6ZfuNTqbHE8', hint: 'Phase 3' }
    ], series: ['What If...? (Disney+)']
  },
  thanos: {
    name: 'THANOS', color: '#7B2FBE', subtitle: '"The Mad Titan"',
    desc: 'Warlord from Titan. Armed with the Infinity Gauntlet, he reshaped reality itself to bring "balance" to the universe.',
    powers: 'Cosmic strength, eternal physiology, and master of all six Infinity Stones.',
    heroImg: '/heroes/thanos.png', isTransparent: true, scale: 1.5, type: 'VILLAIN',
    movies: [
      { name: 'Avengers: Infinity War', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChvYDf3tI1nc0pZqS9oP3MK.jpg', trailer: 'https://www.youtube.com/embed/6ZfuNTqbHE8', hint: 'Phase 3' },
      { name: 'Avengers: Endgame', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06vS3STH0STCqCwjZp0ABPqpt.jpg', trailer: 'https://www.youtube.com/embed/TcMBFSGZo1c', hint: 'Phase 3' },
      { name: 'Age of Ultron', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg', trailer: 'https://www.youtube.com/embed/tmeOjFno6Do', hint: 'Phase 2' }
    ], series: []
  },
  deadpool: {
    name: 'DEADPOOL', color: '#CC0000', subtitle: '"The Merc with a Mouth"',
    desc: 'Wade Wilson. Regenerative healing factor and a completely unhinged personality. Licensed to kill and make really bad jokes.',
    powers: 'Regenerative healing, unpredictable combat style, and 4th wall breaking.',
    heroImg: 'https://pngimg.com/uploads/deadpool/deadpool_PNG7.png', isTransparent: true, scale: 0.8, type: 'ANTI-HERO',
    movies: [
      { name: 'Deadpool', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/inVq3FRqcYIRl2la8iZikYYxFNR.jpg', trailer: 'https://www.youtube.com/embed/9bHmHGBzwfk', hint: 'R-Rated | Brutal' },
      { name: 'Deadpool 2', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/to0Cc6ccpMp966SIn4pS99oX94C.jpg', trailer: 'https://www.youtube.com/embed/D86RtevtfrA', hint: 'R-Rated | Funny' },
      { name: 'Logan', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg', trailer: 'https://www.youtube.com/embed/RNHFdmMQWdk', hint: 'Gritty | Brutal' }
    ], series: []
  },
  ironman: {
    name: 'IRON MAN', color: '#E8A020', subtitle: '"I am Iron Man"',
    desc: 'Tony Stark. Genius, billionaire, playboy, philanthropist. Built the most advanced armor in history from a cave with scraps.',
    powers: 'High-tech nano-suit, flight, repulsor beams, and Jarvis AI systems.',
    heroImg: '/heroes/ironman.png', isTransparent: true, scale: 1.5, type: 'HERO',
    movies: [
      { name: 'Iron Man', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/78lPtwv72VTieuOf8bvCFjt1Ghe.jpg', trailer: 'https://www.youtube.com/embed/8hYlB38asDY', hint: 'Phase 1 | Origin' },
      { name: 'Iron Man 2', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6WBeq4fCfn7AN0o21W9qNckfrQl.jpg', trailer: 'https://www.youtube.com/embed/mjFCF3xqVKA', hint: 'Phase 1' },
      { name: 'Iron Man 3', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg', trailer: 'https://www.youtube.com/embed/8ugaeA-nMTc', hint: 'Phase 2 | Solo' }
    ], series: []
  },
  blackpanther: {
    name: 'BLACK PANTHER', color: '#9F7AEA', subtitle: '"Wakanda Forever"',
    desc: "T'Challa, King of Wakanda. Protector of his nation and bearer of the Vibranium-woven Panther Habit. Warrior. King. Legend.",
    powers: 'Vibranium suit, enhanced senses, superhuman agility and unmatched combat mastery.',
    heroImg: '/heroes/blackpanther.png', isTransparent: true, scale: 1.4, type: 'HERO',
    movies: [
      { name: 'Black Panther', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', trailer: 'https://www.youtube.com/embed/xjDjIWPwcPU', hint: 'Phase 3 | Wakanda' },
      { name: 'Wakanda Forever', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sv1xJUazXoQuIDfj0YuMy3cVEIU.jpg', trailer: 'https://www.youtube.com/embed/_Z3QKkl1WyM', hint: 'Phase 4 | Tribute' },
      { name: 'Civil War', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rAGqG7jsS7bi6tjrS0CYH06aspY.jpg', trailer: 'https://www.youtube.com/embed/dKrVegVI0Us', hint: 'Phase 3 | Wars' }
    ], series: []
  },
  batman: {
    name: 'BATMAN', color: '#718096', subtitle: '"The Dark Knight"',
    desc: "Bruce Wayne. The world's greatest detective guarding Gotham from the shadows. No powers — pure willpower, intellect, and grit.",
    powers: 'Peak human condition, genius intellect, master martial artist, and legendary gadgetry.',
    heroImg: '/heroes/batman.png', isTransparent: true, scale: 0.8, type: 'HERO',
    movies: [
      { name: 'Batman Begins', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8RW2runSEc34IwKN2D1aPcJd2UL.jpg', trailer: 'https://www.youtube.com/embed/neY2xVmOfUM', hint: 'Origin | Dark' },
      { name: 'The Dark Knight', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg', trailer: 'https://www.youtube.com/embed/EXeTwQWrcwY', hint: 'Joker | Classic' },
      { name: 'The Batman 2022', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T6f4uC3.jpg', trailer: 'https://www.youtube.com/embed/mqqft2x_Aa4', hint: '2022 | Detective' }
    ], series: ['Batman: The Animated Series']
  },
  spiderman: {
    name: 'SPIDER-MAN', color: '#FC4444', subtitle: '"Your Friendly Neighborhood"',
    desc: 'Peter Parker. High school genius bitten by a radioactive spider. With great power comes great responsibility.',
    powers: 'Web-slinging, wall-crawling, spider-sense, superhuman agility and strength.',
    heroImg: '/heroes/spiderman.png', isTransparent: true, scale: 1.2, type: 'HERO',
    movies: [
      { name: 'Homecoming', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', trailer: 'https://www.youtube.com/embed/rk-dF1lIbIg', hint: 'Phase 3 | Origin' },
      { name: 'Far From Home', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4q2hz2m7hubCH2ZH7An5cvR0HVJ.jpg', trailer: 'https://www.youtube.com/embed/Nt9L1jCKGnE', hint: 'Phase 3 | Europe' },
      { name: 'No Way Home', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', trailer: 'https://www.youtube.com/embed/JfVOs4VSpmA', hint: 'Phase 4 | Multiverse' }
    ], series: []
  },
  venom: {
    name: 'VENOM', color: '#6B46C1', subtitle: '"We Are Venom"',
    desc: 'Eddie Brock bonded with an alien symbiote. Two minds, one unstoppable dark force. Predator and reluctant protector.',
    powers: 'Symbiote physiology, shape-shifting tendrils, immunity to spider-sense, and superhuman strength.',
    heroImg: '/heroes/venom.png', isTransparent: true, scale: 1.5, type: 'ANTI-HERO',
    movies: [
      { name: 'Venom', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg', trailer: 'https://www.youtube.com/embed/u9Mv98Gr5pY', hint: 'Origin | Dark' },
      { name: 'Let There Be Carnage', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg', trailer: 'https://www.youtube.com/embed/-ezfi6FQ3Pk', hint: 'Carnage | Chaos' },
      { name: 'The Last Dance', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aosm8NMQ3UyoBVpSxyimorCQykC.jpg', trailer: 'https://www.youtube.com/embed/GqK7D2oGsI4', hint: 'Final Chapter' }
    ], series: []
  },
  drdoom: {
    name: 'DR. DOOM', color: '#2F855A', subtitle: '"Ruler of Latveria"',
    desc: 'Victor Von Doom. Monarch, sorcerer, and scientist. His iron mask hides a face as frightening as his ambition.',
    powers: 'Mastery of sorcery and technology, invincible armor, time travel, and cosmic power absorption.',
    heroImg: '/heroes/drdoom.png', isTransparent: true, scale: 1.5, type: 'VILLAIN',
    movies: [
      { name: 'Fantastic Four (2005)', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nI8RoHYFiuNYYGqrJWyaqnpWCZf.jpg', trailer: 'https://www.youtube.com/embed/Ggm_4IfAIRc', hint: 'Classic | Villain' },
      { name: 'Fantastic Four (2025)', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lXA3GSNM9cZcfATGgtGOJTfvN1E.jpg', trailer: 'https://www.youtube.com/embed/Ggm_4IfAIRc', hint: 'Phase 6 | Power' },
      { name: 'Avengers: Doomsday', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChvYDf3tI1nc0pZqS9oP3MK.jpg', trailer: 'https://www.youtube.com/embed/Ggm_4IfAIRc', hint: 'Phase 6 | Epic' }
    ], series: []
  },
  thor: {
    name: 'THOR', color: '#3182CE', subtitle: '"God of Thunder"',
    desc: 'Asgardian prince and God of Thunder. Wields Mjolnir with the power of lightning. Protector of the Nine Realms and Earth.',
    powers: 'God-level strength, lightning control, Mjolnir & Stormbreaker, flight, and immortality.',
    heroImg: '/heroes/thor.png', isTransparent: true, scale: 1.5, type: 'HERO',
    movies: [
      { name: 'Thor', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/prSfAi1xGrhLQNxVSUFh61Daja9.jpg', trailer: 'https://www.youtube.com/embed/JOe4zuHQqLc', hint: 'Phase 1 | Origin' },
      { name: 'Thor: Ragnarok', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rzRwTcFvttcN1gjkGofXRRwnFL6.jpg', trailer: 'https://www.youtube.com/embed/ue80QwXMRHg', hint: 'Phase 3 | Epic' },
      { name: 'Thor: Love & Thunder', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', trailer: 'https://www.youtube.com/embed/tgB1wUcmbbw', hint: 'Phase 4' }
    ], series: []
  },
  loki: {
    name: 'LOKI', color: '#276749', subtitle: '"God of Mischief"',
    desc: "God of Mischief. Odin's adopted son from Asgard. A cunning shapeshifter dancing between villain and reluctant hero.",
    powers: 'Sorcery, illusion casting, shapeshifting, enchanted weapons, and time manipulation.',
    heroImg: '/heroes/loki.png', isTransparent: true, scale: 1.5, type: 'VILLAIN',
    movies: [
      { name: 'Thor (2011)', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/prSfAi1xGrhLQNxVSUFh61Daja9.jpg', trailer: 'https://www.youtube.com/embed/JOe4zuHQqLc', hint: 'Phase 1 | Villain' },
      { name: 'The Avengers', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24zekr6kMQHlFxI.jpg', trailer: 'https://www.youtube.com/embed/eOrNdBpGMv8', hint: 'Phase 1 | Invasion' },
      { name: 'Thor: Ragnarok', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rzRwTcFvttcN1gjkGofXRRwnFL6.jpg', trailer: 'https://www.youtube.com/embed/ue80QwXMRHg', hint: 'Phase 3 | Chaos' }
    ], series: ['Loki (Disney+)', 'Loki Season 2 (Disney+)']
  },
  captainamerica: {
    name: 'CAPTAIN AMERICA', color: '#2B4C8C', subtitle: '"The First Avenger"',
    desc: 'Steve Rogers. A small kid from Brooklyn turned into the living embodiment of courage. Fought for freedom across time itself.',
    powers: 'Super-soldier serum, enhanced strength & endurance, vibranium shield, and unwavering moral courage.',
    heroImg: '/heroes/captainamerica.png', isTransparent: true, scale: 1.5, type: 'HERO',
    movies: [
      { name: 'The First Avenger', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg', trailer: 'https://www.youtube.com/embed/JerVrbLldXw', hint: 'Phase 1 | WW2' },
      { name: 'The Winter Soldier', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5TQ6JQNBrQLDwAZTcrFwYF9BQOC.jpg', trailer: 'https://www.youtube.com/embed/7SlILk2WMTI', hint: 'Phase 2 | Thriller' },
      { name: 'Civil War', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rAGqG7jsS7bi6tjrS0CYH06aspY.jpg', trailer: 'https://www.youtube.com/embed/dKrVegVI0Us', hint: 'Phase 3 | War' }
    ], series: ['The Falcon and the Winter Soldier (Disney+)']
  },
  guardians: {
    name: 'STAR-LORD', color: '#C05621', subtitle: '"Guardian of the Galaxy"',
    desc: "Peter Quill. Half-human, half-Celestial. Leader of the Guardians of the Galaxy — the most unlikely heroes the universe has seen.",
    powers: 'Celestial heritage, element guns, jet-pack, master combatant, and leader of the Guardians.',
    heroImg: '/heroes/star load.png', isTransparent: true, scale: 1.5, type: 'HERO',
    movies: [
      { name: 'Guardians of the Galaxy', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lenCbHOuhPkKpOEhIf1LkBv3Reu.jpg', trailer: 'https://www.youtube.com/embed/d96cjJhvlMA', hint: 'Phase 2 | Epic' },
      { name: 'Guardians Vol. 2', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/y4MBh0EjBlMuOzv9axM4epe84RD.jpg', trailer: 'https://www.youtube.com/embed/dW1BIid8Osg', hint: 'Phase 3 | Family' },
      { name: 'Guardians Vol. 3', img: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r2J02Z2OpNTctfOSN1Ydgv9iRhL.jpg', trailer: 'https://www.youtube.com/embed/u3V5KDHRQvk', hint: 'Phase 5 | Finale' }
    ], series: ['I Am Groot (Disney+)']
  }
};

const NAV_ITEMS = ['Profile', 'Synopsis', 'Gallery', 'Series', 'Trailer'];
const TYPE_COLORS = { HERO: '#48BB78', VILLAIN: '#FC8181', 'ANTI-HERO': '#F6AD55' };

const App = () => {
  const [activeHero, setActiveHero] = useState('drstrange');
  const [activeNav, setActiveNav] = useState('Profile');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [imgErrors, setImgErrors] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [authModal, setAuthModal] = useState(null);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('marvel_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const mockUser = {
      name: formData.get('name') || 'Avenger',
      email: formData.get('email'),
      isVerified: true,
      avatar: `https://ui-avatars.com/api/?name=${formData.get('name') || 'A'}&background=random&color=fff`
    };
    setUser(mockUser);
    localStorage.setItem('marvel_user', JSON.stringify(mockUser));
    setAuthModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marvel_user');
  };

  const hero = HEROES_DATA[activeHero];

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const handleHeroSwitch = (key) => { setActiveHero(key); setActiveNav('Profile'); };
  const handleMovieClick = (movie) => { setSelectedMovie(movie); setIsVideoOpen(true); };
  const handleNavClick = (item) => {
    if (item === 'Trailer') handleMovieClick(hero.movies[0]);
    else setActiveNav(item);
  };

  const getHeroImg = (key) => {
    if (imgErrors[key]) return `https://ui-avatars.com/api/?name=${key.substring(0,2).toUpperCase()}&background=${HEROES_DATA[key].color.replace('#','')}&color=fff&size=400&bold=true`;
    return HEROES_DATA[key].heroImg;
  };
  const handleImgError = (key) => setImgErrors(p => ({ ...p, [key]: true }));

  return (
    <div className="app-container" style={{ '--theme-color': hero.color }}>
      <div className="cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="stars" />

      {/* Hero Character Left */}
      <div className="thanos-side-container">
        <div className="hero-img-scaler" style={{ transform: `scale(${hero.scale || 1})` }}>
          <img
            key={activeHero + '_img'}
            src={getHeroImg(activeHero)}
            alt={hero.name}
            className={`thanos-main-img animate-float${hero.isTransparent ? '' : ' bg-img'}`}
            onError={() => handleImgError(activeHero)}
          />
        </div>
        <div className="type-badge" style={{ background: TYPE_COLORS[hero.type] }}>
          {hero.type}
        </div>
      </div>

      {/* Top Nav */}
      <header className="top-header animate-fade-down">
        <div className="logo-text">M</div>
        <nav className="glass-nav-pill">
          <ul className="nav-list">
            {NAV_ITEMS.map(item => (
              <li key={item}
                className={activeNav === item && item !== 'Trailer' ? 'active' : ''}
                onClick={() => handleNavClick(item)}>
                {item}
              </li>
            ))}
            <li onClick={() => setAuthModal('login')}>
              <div className="avatar-circle">👤</div>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="hero-main">

        {activeNav === 'Profile' && (
          <div className="hero-text-block animate-fade-in" key={activeHero + '_p'}>
            <p className="hero-tag">MARVEL UNIVERSE ⟡ {hero.type}</p>
            <h1 className="hero-title animate-glow">{hero.name}</h1>
            <h2 className="hero-subtitle">{hero.subtitle}</h2>
            <p className="hero-desc">{hero.desc}</p>
            <div className="powers-line">
              <span className="powers-label">POWERS: </span>{hero.powers}
            </div>
            <div className="hero-primary-actions">
              <button className="read-more-pill" style={{ background: hero.color }} onClick={() => setActiveNav('Synopsis')}>Learn More</button>
              <button className="secondary-btn" style={{ borderColor: hero.color }} onClick={() => setAuthModal('signup')}>Join Universe</button>
            </div>
          </div>
        )}

        {activeNav === 'Synopsis' && (
          <div className="synopsis-view animate-zoom-in" key={activeHero + '_s'}>
            <h2 className="section-title">CHRONICLES</h2>
            <p className="synopsis-p">{hero.desc} Known for {hero.powers.toLowerCase()}.</p>
            <div className="stat-bars">
              <div className="stat"><label>Strength</label><div className="bar"><div className="fill" style={{ width: '95%' }} /></div></div>
              <div className="stat"><label>Intellect</label><div className="bar"><div className="fill" style={{ width: '88%' }} /></div></div>
              <div className="stat"><label>Agility</label><div className="bar"><div className="fill" style={{ width: '82%' }} /></div></div>
              <div className="stat"><label>Durability</label><div className="bar"><div className="fill" style={{ width: '92%' }} /></div></div>
            </div>
            <button className="back-btn" onClick={() => setActiveNav('Profile')}>← Back</button>
          </div>
        )}

        {activeNav === 'Gallery' && (
          <div className="gallery-grid-view animate-fade-in" key={activeHero + '_g'}>
            <h2 className="section-title">MOVIE GALLERY</h2>
            <div className="gallery-layout">
              {hero.movies.map((m, i) => (
                <div key={i} className="gallery-card" onClick={() => handleMovieClick(m)}>
                  <img src={m.img} alt={m.name} className="grid-img" onError={e => { e.target.src = 'https://via.placeholder.com/300x450?text=' + m.name; }} />
                  <div className="gallery-overlay"><span className="play-icon-lg">▶</span></div>
                  <div className="gallery-label">
                    <span className="movie-name-txt">{m.name}</span>
                    <span className="hint-badge">{m.hint}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={() => setActiveNav('Profile')}>← Back</button>
          </div>
        )}

        {activeNav === 'Series' && (
          <div className="series-view animate-zoom-in" key={activeHero + '_sr'}>
            <h2 className="section-title">MOVIE SERIES</h2>
            <div className="series-list">
              {hero.movies.map((m, i) => (
                <div key={i} className="series-row" onClick={() => handleMovieClick(m)}>
                  <span className="series-num">0{i + 1}</span>
                  <img src={m.img} className="series-thumb" alt={m.name} onError={e => { e.target.style.display = 'none'; }} />
                  <div className="series-info">
                    <h4 className="series-title-txt">{m.name}</h4>
                    <p className="series-hint">{m.hint}</p>
                  </div>
                  <button className="series-play-btn" style={{ background: hero.color }}>▶ Play</button>
                </div>
              ))}
            </div>
            {hero.series.length > 0 && (
              <>
                <h2 className="section-title" style={{ marginTop: '30px' }}>STREAMING SERIES</h2>
                <div className="streaming-tags">
                  {hero.series.map((s, i) => (
                    <span key={i} className="stream-tag" style={{ borderColor: hero.color, color: hero.color }}>{s}</span>
                  ))}
                </div>
              </>
            )}
            <button className="back-btn" style={{ marginTop: '20px' }} onClick={() => setActiveNav('Profile')}>← Back</button>
          </div>
        )}

        {/* Bottom Movie Row */}
        <div className="bottom-movies-row" key={activeHero + '_movies'}>
          {hero.movies.map((movie, idx) => (
            <div key={idx} className="movie-horizontal-card animate-pop-in"
              style={{ animationDelay: `${idx * 0.12}s` }}
              onClick={() => handleMovieClick(movie)}>
              <div className="m-thumb" style={{ backgroundImage: `url(${movie.img})` }}>
                <div className="play-overlay">
                  <div className="hint-tag">{movie.hint}</div>
                  <span className="play-icon">▶</span>
                </div>
              </div>
              <div className="m-label">{movie.name}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="auth-row-sidebar">
          {user ? (
            <div className="user-profile-mini">
              <img src={user.avatar} alt="avatar" className="user-avatar-small" />
              <div className="user-info-text">
                <span className="user-name-txt">{user.name}</span>
                <span className="logout-link" onClick={handleLogout}>Logout</span>
              </div>
            </div>
          ) : (
            <>
              <span className="auth-action-link" onClick={() => setAuthModal('signup')}>Register</span>
              <button className="login-pill-sidebar" onClick={() => setAuthModal('login')} style={{ background: 'var(--theme-color)' }}>LOGIN</button>
            </>
          )}
        </div>
        <div className="vertical-gallery">
          {Object.keys(HEROES_DATA).map(key => (
            <div key={key}
              className={`v-gallery-item ${activeHero === key ? 'active' : ''}`}
              onClick={() => handleHeroSwitch(key)}
              title={HEROES_DATA[key].name}>
              <img src={getHeroImg(key)} alt={key} className="char-thumb" onError={() => handleImgError(key)} />
              {activeHero === key && <div className="char-name-label">{HEROES_DATA[key].name.split(' ')[0]}</div>}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <p className="pick-text">CHOOSE HERO</p>
        </div>
      </div>

      {/* Auth Modal */}
      {authModal && (
        <div className="modal-overlay-center animate-fade-in" onClick={() => setAuthModal(null)}>
          <div className="auth-modal-card animate-pop-in" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setAuthModal(null)}>&times;</button>
            <div className="auth-modal-header">
              <div className="auth-hero-badge">🧬</div>
              <h2>{authModal === 'login' ? 'WELCOME BACK' : 'JOIN THE INITIATIVE'}</h2>
              <p>{authModal === 'login' ? 'Access your multiverse profile' : 'Verify with Google to begin'}</p>
            </div>
            
            <form className="auth-modal-body" onSubmit={handleLogin}>
              {authModal === 'signup' && (
                <div className="input-group">
                  <label>REAL NAME</label>
                  <input type="text" name="name" placeholder="Enter your name" required />
                </div>
              )}
              <div className="input-group">
                <label>EMAIL ADDRESS</label>
                <input type="email" name="email" placeholder="name@multiverse.com" required />
              </div>
              <div className="input-group">
                <label>PASSWORD</label>
                <input type="password" placeholder="••••••••" required />
              </div>

              <div className="google-verify-strip">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="google" className="g-logo" />
                <span>Verify Google Account Link</span>
                <input type="checkbox" required className="g-check" />
              </div>

              <button type="submit" className="execute-btn" style={{ background: 'var(--theme-color)' }}>
                {authModal === 'login' ? 'READY TO STRIKE' : 'INITIALIZE ACCOUNT'}
              </button>
            </form>

            <div className="switch-auth">
              {authModal === 'login' ? "Don't have an ID? " : "Already registered? "}
              <span onClick={() => setAuthModal(authModal === 'login' ? 'signup' : 'login')}>
                {authModal === 'login' ? 'SIGN UP' : 'LOGIN'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content-large animate-zoom-in" onClick={e => e.stopPropagation()}>
            <button className="close-video-btn" style={{ background: hero.color }} onClick={() => setIsVideoOpen(false)}>✕</button>
            <div className="iframe-wrapper">
              <iframe width="100%" height="100%"
                src={`${selectedMovie?.trailer}?autoplay=1`}
                title="Marvel Trailer" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
            <div className="video-info-overlay">
              <div className="v-title-wrap">
                <img src={selectedMovie?.img} alt="Poster" className="v-mini-poster" onError={e => { e.target.style.display = 'none'; }} />
                <div>
                  <h3 className="v-name" style={{ color: hero.color }}>{selectedMovie?.name}</h3>
                  <p className="v-status">NOW STREAMING ⟡ {selectedMovie?.hint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
