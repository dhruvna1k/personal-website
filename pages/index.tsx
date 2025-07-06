import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [nameVisible, setNameVisible] = useState(false);
  const [nameInCenter, setNameInCenter] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [titlesStarted, setTitlesStarted] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const jobTitles = [
    'Full Stack Development',
    'Management Consulting',
    'Venture Capital',
    'Product Strategy'
  ];

  useEffect(() => {
    // Stage 1: Name appears and starts moving down (after 300ms)
    const nameTimer = setTimeout(() => {
      setNameVisible(true);
    }, 300);

    // Stage 2: Name reaches center (after 500ms)
    const centerTimer = setTimeout(() => {
      setNameInCenter(true);
    }, 500);

    // Stage 3: Navigation appears (after 1000ms)
    const navTimer = setTimeout(() => {
      setNavVisible(true);
    }, 1000);

    // Stage 4: Job titles start (after 1500ms)
    const titlesTimer = setTimeout(() => {
      setTitlesStarted(true);
    }, 1500);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(centerTimer);
      clearTimeout(navTimer);
      clearTimeout(titlesTimer);
    };
  }, []);

  useEffect(() => {
    if (!titlesStarted) return;

    const currentTitle = jobTitles[currentJobTitle];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentTitle.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 100); // Typing speed
      } else {
        // Pause before starting to delete
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause duration
      }
    } else {
      // Deleting effect
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Deleting speed (faster than typing)
      } else {
        // Move to next title and start typing
        setCurrentJobTitle((prev) => (prev + 1) % jobTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isTyping, currentJobTitle, jobTitles, titlesStarted]);

  const sections = [
    { id: 'intro', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'writing', label: 'Writing' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-timberwolf-800 via-cambridge_blue-800 to-air_force_blue-800 text-caribbean_current-100 overflow-hidden">
      {/* Top Navigation - Full Width */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-timberwolf-600/90 backdrop-blur-md border-b border-cambridge_blue-400/30 transition-all duration-1000 ease-out ${
          navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ height: 'auto', maxWidth: '100vw' }}
      >
        <div className="w-full h-full px-2 md:px-6 py-2 md:py-4 mx-auto max-w-7xl">
          <div className="flex justify-center md:justify-between items-center w-full h-full">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`font-bold transition-all duration-500 ease-out relative whitespace-nowrap ${
                  navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                } ${
                  activeSection === section.id 
                    ? 'text-tea_rose-400' 
                    : 'text-air_force_blue-400 hover:text-caribbean_current-400'
                }`}
                style={{ 
                  fontSize: 'clamp(0.875rem, 2vw, 1.5rem)',
                  padding: 'clamp(6px, 1vw, 12px) clamp(8px, 1.5vw, 18px)',
                  transitionDelay: `${(index * 100) + 200}ms`
                }}
              >
                {section.label}
                <div 
                  className={`absolute left-0 right-0 bg-tea_rose-400 transition-all duration-300 ${
                    activeSection === section.id ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ bottom: '-4px', height: '2px' }}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-[72px] md:pt-[88px] w-full h-[calc(100vh-72px)] md:h-[calc(100vh-88px)] overflow-y-auto scrollbar-thin scrollbar-thumb-cambridge_blue-400/30 scrollbar-track-transparent">
        {activeSection === 'experience' ? (
          <section className="px-4 md:px-8 py-8 max-w-5xl w-full mx-auto">
            <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
              <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Associate Consultant Intern</h3>
              <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">Bain & Company • June 2025 - September 2025 • Internship</p>
              <div className="space-y-2 md:space-y-3">
                <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">GenAI strategy for a large fintech company</p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-12 pb-12 md:pb-16">
              <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
                <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Investment Analyst Intern</h3>
                <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">FUSE VC • June 2024 - September 2024 • Seattle, WA</p>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">Analyzed product viability and go-to-market motions of early-stage B2B software companies in the PNW</p>
                </div>
              </div>
              
              <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
                <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Co-Founder and Chief Product Officer</h3>
                <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">Resolute Health • May 2024 - September 2024 • Remote</p>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">Built MVP (full-stack) for a digital pharmaceutical AI-first cognitive behavioral therapist with relapse prediction capabilities for habit-breaking</p>
                </div>
              </div>
              
              <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
                <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Full-stack Developer</h3>
                <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">Stanford Byers' Center for Biodesign • January 2024 - March 2024 • Stanford, CA</p>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">Collaborated with a team of four upperclassmen & Master's CS students to build an LLM-based physical activity chatbot contextualized on health data collected by iPhone/Apple Watch</p>
                </div>
              </div>

              <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
                <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Software Engineering Intern</h3>
                <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">ORO Labs • June 2023 - September 2023 • Seattle, WA</p>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">Developed a GPT-based NLP/OCR feature in Python to extract key information from client documents.</p>
                </div>
              </div>
              
              <div className="border-l-4 border-air_force_blue-500 pl-6 md:pl-12 pb-8 md:pb-12">
                <h3 className="text-xl md:text-3xl font-medium text-caribbean_current-200 mb-2 md:mb-3">Student Manager (Paid part-time)</h3>
                <p className="text-base md:text-xl text-cambridge_blue-400 mb-4 md:mb-6">Stanford University Men's Basketball • September 2022 - Present • Palo Alto, CA</p>
                <div className="space-y-2 md:space-y-3">
                  <p className="text-sm md:text-lg text-air_force_blue-300 leading-relaxed">Supported day-to-day practices, worked game days, traveled across the country routinely during the season</p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <main className="relative w-full h-full">
            {/* Intro Section */}
            <section className={`min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-16 transition-all duration-1000 ${
              activeSection === 'intro' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}>
              {/* Animated Name - Big and Bold */}
              <div className={`text-center mb-8 md:mb-12 transition-all duration-[1200ms] ease-out ${
                !nameVisible ? 'transform -translate-y-[200vh] opacity-0' : 
                !nameInCenter ? 'transform -translate-y-96 opacity-100' : 
                'transform translate-y-0 opacity-100'
              }`}>
                <h1 
                  className={`font-black mb-4 transition-all duration-1500 ease-out text-caribbean_current-200 ${
                    nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
                  }`}
                  style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', lineHeight: '1' }}
                >
                  Dhruv Naik
                </h1>
                
                {/* Animated Job Titles - Typewriter Effect */}
                <div className={`h-16 md:h-20 flex items-center justify-center transition-all duration-1000 ease-out ${
                  titlesStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`} style={{ transitionDelay: '500ms' }}>
                  <p 
                    className="text-tea_rose-400 font-light"
                    style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', lineHeight: '1.2' }}
                  >
                    <span className="inline-block">
                      {displayedText}
                      {titlesStarted && <span className="animate-pulse">|</span>}
                    </span>
                  </p>
                </div>
              </div>

              {/* Intro Content */}
              <div className={`max-w-4xl text-center mt-8 md:mt-16 transition-all duration-1000 ease-out ${
                titlesStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`} style={{ transitionDelay: '1000ms' }}>
                <div className="flex justify-center space-x-8">
                  <div className="w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-tea_rose-400 to-transparent animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className={`min-h-screen flex items-center justify-center px-4 md:px-8 absolute inset-0 pt-24 transition-all duration-1000 ${
              activeSection === 'about' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`} style={{ paddingTop: navVisible ? '72px' : '24px' }}>
              <div className="max-w-5xl w-full">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="space-y-6 md:space-y-8">
                    <p className="text-base md:text-xl text-air_force_blue-300 leading-relaxed">
                      Stanford undergrad studying Economics and Computer Science with real-world experience growing businesses and developing useful products.
                    </p>
                    <p className="text-base md:text-xl text-air_force_blue-300 leading-relaxed">
                      Having worked in consulting, VC, and SWE, I excel at researching, discovering, and building solutions for meaningful problems in various domains.
                    </p>
                    <p className="text-base md:text-xl text-air_force_blue-300 leading-relaxed">
                      Right now, I'm curious about the generational impacts of macroeconomic market movements, directions of B2B AI/ML, the history of technology and finance in the US, and the value of creative endeavors. Check out my Substack!
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="w-3 h-3 bg-tea_rose-400 rounded-full"></div>
                        <span className="text-base md:text-xl text-caribbean_current-200">Full Stack Development</span>
                      </div>
                      <div className="ml-7 md:ml-9 space-y-2">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-cambridge_blue-400 rounded-full"></div>
                          <span className="text-sm md:text-lg text-air_force_blue-400">JavaScript / TypeScript</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-cambridge_blue-400 rounded-full"></div>
                          <span className="text-sm md:text-lg text-air_force_blue-400">React / Next.js</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-cambridge_blue-400 rounded-full"></div>
                          <span className="text-sm md:text-lg text-air_force_blue-400">Python / SQL</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-cambridge_blue-400 rounded-full"></div>
                          <span className="text-sm md:text-lg text-air_force_blue-400">C / C++</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-cambridge_blue-400 rounded-full"></div>
                          <span className="text-sm md:text-lg text-air_force_blue-400">Git / GitHub</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="w-3 h-3 bg-tea_rose-400 rounded-full"></div>
                      <span className="text-base md:text-xl text-caribbean_current-200">Product Strategy</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="w-3 h-3 bg-tea_rose-400 rounded-full"></div>
                      <span className="text-base md:text-xl text-caribbean_current-200">Venture Diligence</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="w-3 h-3 bg-tea_rose-400 rounded-full"></div>
                      <span className="text-base md:text-xl text-caribbean_current-200">Microsoft Office</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className={`min-h-screen flex items-center justify-center px-4 md:px-8 absolute inset-0 pt-24 transition-all duration-1000 ${
              activeSection === 'projects' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`} style={{ paddingTop: navVisible ? '72px' : '24px' }}>
              <div className="max-w-7xl w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
                  {/* Project 1 */}
                  <div className="group cursor-pointer w-full md:min-w-0 md:max-w-none md:col-span-1">
                    <a href="https://github.com/omfarkas/floatapp" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-cambridge_blue-700/30 backdrop-blur-sm border border-timberwolf-500/30 rounded-xl p-4 md:p-8 pb-6 md:pb-10 transition-all duration-300 hover:bg-cambridge_blue-600/40 hover:border-tea_rose-400/50 hover:transform hover:scale-105">
                        <h3 className="text-lg md:text-2xl font-medium text-caribbean_current-200 mb-3 md:mb-6">Float</h3>
                        <p className="text-sm md:text-lg text-air_force_blue-300 mb-4 md:mb-8 leading-relaxed">Partiful for the day-of. A web app that lets close friends see and RSVP to things you have planned for the day (work, coffee, gym, etc.)</p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">React</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">TypeScript</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Supabase</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">SQL</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Project 2 */}
                  <div className="group cursor-pointer w-full md:min-w-0 md:max-w-none md:col-span-1">
                    <a href="https://github.com/dreclor/Resolute" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-cambridge_blue-700/30 backdrop-blur-sm border border-timberwolf-500/30 rounded-xl p-4 md:p-8 pb-6 md:pb-10 transition-all duration-300 hover:bg-cambridge_blue-600/40 hover:border-tea_rose-400/50 hover:transform hover:scale-105">
                        <h3 className="text-lg md:text-2xl font-medium text-caribbean_current-200 mb-3 md:mb-6">Resolute Health</h3>
                        <p className="text-sm md:text-lg text-air_force_blue-300 mb-4 md:mb-8 leading-relaxed">AI-first cognitive behavioral therapist with relapse prediction capabilities for habit-breaking. Built full-stack MVP.</p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Python</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">React Native</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Expo</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Tailwind</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Typescript</span>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Project 3 */}
                  <div className="group cursor-pointer w-full md:min-w-0 md:max-w-none md:col-span-1">
                    <a href="https://github.com/dhruvna1k/SpeziTemplateApplication" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="bg-cambridge_blue-700/30 backdrop-blur-sm border border-timberwolf-500/30 rounded-xl p-4 md:p-8 pb-6 md:pb-10 transition-all duration-300 hover:bg-cambridge_blue-600/40 hover:border-tea_rose-400/50 hover:transform hover:scale-105">
                        <h3 className="text-lg md:text-2xl font-medium text-caribbean_current-200 mb-3 md:mb-6">Prisma</h3>
                        <p className="text-sm md:text-lg text-air_force_blue-300 mb-4 md:mb-8 leading-relaxed">LLM-based physical activity chatbot contextualized on health data collected by iPhone/Apple Watch. Built with Stanford Biodesign team.</p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Swift</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Python</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">Javascript</span>
                          <span className="px-2 py-1 md:px-4 md:py-2 bg-tea_rose-400/20 text-tea_rose-300 rounded-full text-xs md:text-sm font-medium">iOS Integration (Spezi Apple Health)</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Writing Section */}
            <section className={`min-h-screen flex items-center justify-center px-4 md:px-8 absolute inset-0 pt-24 transition-all duration-1000 ${
              activeSection === 'writing' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`} style={{ paddingTop: navVisible ? '72px' : '24px' }}>
              <div className="max-w-5xl w-full">
                <div className="flex justify-center mb-8 md:mb-10">
                  <a
                    href="https://dhruvnaik.substack.com/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 md:px-8 py-3 md:py-4 bg-tea_rose-400 text-timberwolf-900 font-bold rounded-full text-base md:text-xl shadow-lg hover:bg-tea_rose-300 transition-colors"
                  >
                    Subscribe to my Substack
                  </a>
                </div>
                <div className="space-y-8 md:space-y-10">
                  {[
                    {
                      title: 'What Wiping the Floors Taught Me',
                      desc: "On being a student manager for Stanford Men's Basketball.",
                      date: 'March 2025',
                      link: 'https://dhruvnaik.substack.com/p/what-wiping-the-floors-taught-me?r=1s1g4o'
                    },
                    {
                      title: 'What I Learned From a Summer in Venture Capital',
                      desc: "Thoughts and lessons for entrepreneurs and investors from an insider's perspective",
                      date: 'February 2025',
                      link: 'https://dhruvnaik.substack.com/p/what-i-learned-from-a-summer-in-venture?r=1s1g4o'
                    },
                  ].map((article, index) => (
                    <article key={index} className="border-b border-timberwolf-500/30 pb-8 last:border-b-0">
                      <h3 className="text-xl md:text-2xl font-medium text-caribbean_current-200 mb-3 hover:text-tea_rose-400 transition-colors cursor-pointer">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
                      </h3>
                      <p className="text-base md:text-lg text-air_force_blue-300 mb-3 leading-relaxed">{article.desc}</p>
                      <time className="text-sm md:text-base text-cambridge_blue-400 font-medium">{article.date}</time>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </main>
        )}
      </div>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-tea_rose-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cambridge_blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default HomePage; 