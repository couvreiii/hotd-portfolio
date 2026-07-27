import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import SmoothScroll from './SmoothScroll';
import ParallaxLayer from './components/ParallaxLayer';
import Embers from './components/Embers';
import ProjectCard from './components/ProjectCard';
import FadeIn from './components/FadeIn';
import HeroSphere from './components/HeroSphere';
import DragonCursor from './components/DragonCursor'; // 👈 NEW IMPORT

// --- DATA ---

const projects = [
  {
    title: "Activity 1: CSS Position Demonstrations",
    description: "Explore the six fundamental CSS positioning methods through interactive demonstrations.",
    techStack: ["CSS3", "HTML5", "Layout Design"],
    height: "h-[500px]",
    image: "/dragons/meraxes.jpeg",
    status: "completed",
    link: "/Act1/act1.html" 
  },
  {
    title: "Activity 2: CSS Transforms & Hover Effects",
    description:"An interactive medieval-themed demonstration of CSS transforms with hover effects.",
    techStack: ["CSS", "Transforms", "Interactive Design"],
    height: "h-96",
    image: "/dragons/Balerion.jpeg",
    status: "completed",
    link: "/Act2/act2.html" 
  },
  {
    title: "Activity 3: Basic WebGL Shapes",
    description: "Basic WebGL implementation rendering fundamental geometric shapes using shaders.",
    techStack: ["WebGL", "Shaders", "3D Graphics"],
    height: "h-96",
    image: "/dragons/Vhagar.jpeg",
    status: "completed",
    link: "/act3/act3.html"
  },
  {
    title: "Activity 4: Interactive 3D Shapes",
    description: "Advanced WebGL rendering with interactive mouse drag rotation and wireframe borders.",
    techStack: ["WebGL", "3D Graphics", "User Interaction"],
    height: "h-[500px]",
    image: "/dragons/Seasmoke.jpeg",
    status: "completed",
    link: "/act4/act4.html"
  },
  {
    title: "Activity 5: 3D Extruded Polygon",
    description: "Complex 3D extruded polygon with WebGL 2.0, lighting, and continuous rotation.",
    techStack: ["WebGL 2.0", "Lighting", "Matrix Math"],
    height: "h-96",
    image: "/dragons/Syrax.jpeg",
    status: "completed",
    link: "/act5/act5.html"
  },
  {
    title: "Activity 6: 3D Textures",
    description: "Three.js scene with GLB model loading, texture mapping, and multiple lighting types.",
    techStack: ["Three.js", "GLB Models", "Lighting"],
    height: "h-96",
    image: "/dragons/Dreamfyre.jpeg",
    status: "completed",
    link: "/act6/act6.html"
  },
  {
    title: "Activity 7: The Last Lighthouse",
    description: "Immersive Three.js scene with memory orbs, dynamic weather, and atmospheric storytelling.",
    techStack: ["Three.js", "Storytelling", "Weather Effects"],
    height: "h-[500px]",
    image: "/dragons/Caraxes.jpeg", 
    status: "completed",
    link: "/act7/act7.html" 
  }
];

const hotdCharacters = [
  { name: "Rhaenyra Targaryen", image: "/characters/rhaenyra.jpeg", fallbackIcon: "👑", color: "from-purple-600 to-indigo-700", quote: "I will not be a pawn in someone else's game. I am the rightful heir to the Iron Throne." },
  { name: "Daemon Targaryen", image: "/characters/daemon.jpeg", fallbackIcon: "⚔️", color: "from-red-600 to-rose-700", quote: "I've been called many things. Mad. Cruel. Unhinged. But never dull." },
  { name: "Alicent Hightower", image: "/characters/Alicent.jpeg", fallbackIcon: "🌹", color: "from-green-600 to-emerald-700", quote: "I have never been so insulted in all my life. Nor have I been so afraid." },
  { name: "Viserys Targaryen", image: "/characters/Viserys.jpeg", fallbackIcon: "🔥", color: "from-amber-500 to-orange-600", quote: "Dreams didn't make us kings. Dragons did." },
  { name: "Corlys Velaryon", image: "/characters/Corlys.jpeg", fallbackIcon: "⚓", color: "from-blue-600 to-cyan-700", quote: "History does not remember blood. It remembers names." },
  { name: "Rhaenys Targaryen", image: "/characters/Rhaenys.jpeg", fallbackIcon: "🐉", color: "from-purple-500 to-pink-600", quote: "I was denied my birthright. I will not see the same happen to her." },
  { name: "Otto Hightower", image: "/characters/Otto.jpeg", fallbackIcon: "📜", color: "from-gray-600 to-slate-700", quote: "The Iron Throne cannot tolerate a woman upon it." },
  { name: "Mysaria", image: "/characters/Mysaria.jpeg", fallbackIcon: "🕸️", color: "from-indigo-600 to-purple-700", quote: "Power is a curious thing. It lives in the most unexpected places." },
  { name: "Aegon II", image: "/characters/Aegon.jpeg", fallbackIcon: "", color: "from-yellow-500 to-amber-600", quote: "I am the king. My word is law." }
];

// --- APP COMPONENT ---

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <SmoothScroll>
            <div className="bg-obsidian min-h-screen text-boneWhite font-inter relative overflow-x-hidden">
              
              {/*  DRAGON CURSOR ADDED HERE  */}
              <DragonCursor />
              
              <Navbar />

              {/* --- HERO SECTION --- */}
              <section id="hero" className="relative h-screen flex flex-col justify-center items-center text-center px-4 pt-20">
                <ParallaxLayer speed={0.2} className="absolute inset-0 z-0">
                  <Embers />
                </ParallaxLayer>

                <ParallaxLayer speed={0.5} className="absolute right-[10%] top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                  <div className="w-[500px] h-[500px] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(138,28,28,0.3)]">
                    <HeroSphere />
                  </div>
                </ParallaxLayer>

                <ParallaxLayer speed={-0.3} className="relative z-20 max-w-4xl">
                  <FadeIn>
                    <h1 className="font-cinzel font-bold text-5xl md:text-7xl lg:text-8xl text-gold mb-6 leading-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      FORGING DIGITAL<br />REALMS
                    </h1>
                    <p className="text-smokeGray text-lg md:text-xl max-w-2xl mb-8 mx-auto">
                      I am Chate Caluba, a passionate developer crafting immersive digital experiences.
                      Welcome to my digital kingdom.
                    </p>
                    <a href="#projects" className="inline-block bg-crimson text-boneWhite px-8 py-3 rounded-lg font-bold border border-gold hover:bg-gold hover:text-obsidian transition-all duration-300 shadow-[0_0_20px_rgba(138,28,28,0.6)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                      VIEW WORK
                    </a>
                  </FadeIn>
                </ParallaxLayer>
              </section>

              {/* --- PROJECTS SECTION --- */}
              <section id="projects" className="min-h-screen bg-darkSteel py-20 px-8 relative border-t border-crimson/30">
                <ParallaxLayer speed={0.3} className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-crimson/20 blur-[100px]" />
                </ParallaxLayer>

                <div className="max-w-7xl mx-auto relative z-10">
                  <FadeIn>
                    <h2 className="font-cinzel font-bold text-5xl md:text-6xl text-gold mb-4 text-center">
                      SELECTED WORKS
                    </h2>
                    <p className="text-smokeGray text-lg mb-16 text-center max-w-2xl mx-auto">
                      A collection of my recent digital conquests
                    </p>
                  </FadeIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <ProjectCard
                          title={project.title}
                          description={project.description}
                          techStack={project.techStack}
                          height={project.height}
                          image={project.image}
                          status={project.status}
                          link={project.link}
                        />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </section>

              {/* --- ABOUT SECTION --- */}
              <section id="about" className="min-h-screen bg-obsidian py-20 px-8 relative border-t border-crimson/30">
                <div className="max-w-6xl mx-auto">
                  <FadeIn>
                    <h2 className="font-cinzel font-bold text-5xl md:text-6xl text-gold mb-12 text-center">
                      ABOUT THE FORGE
                    </h2>
                  </FadeIn>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeIn delay={0.2}>
                      <div className="space-y-6">
                        <p className="text-smokeGray text-lg leading-relaxed">
                          I am a passionate developer who loves making digital experiences from imagination.
                          Each project is a forge where creativity meets code, and I strive to craft experiences that are both visually stunning and functionally robust.
                        </p>
                        <p className="text-smokeGray text-lg leading-relaxed">
                          With expertise in React, Three.js, and creative coding. 
                          I love to bring ideas to life, crafting interactive and visually stunning web applications.
                        </p>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                      <div className="grid grid-cols-3 gap-4">
                        {hotdCharacters.map((character, index) => (
                          <motion.div
                            key={character.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative aspect-square bg-darkSteel border border-gold/30 rounded-lg overflow-hidden cursor-pointer hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300"
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                              <img src={character.image} alt={character.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                              <span className="hidden text-5xl md:text-6xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 items-center justify-center w-full h-full bg-darkSteel">{character.fallbackIcon}</span>
                            </div>
                            <div className="absolute inset-0 bg-obsidian/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center backdrop-blur-sm">
                              <p className="font-cinzel text-gold text-xs md:text-sm font-bold mb-2">{character.name}</p>
                              <p className="text-smokeGray text-[10px] md:text-xs italic leading-relaxed">"{character.quote}"</p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent opacity-90 group-hover:opacity-0 transition-opacity duration-300">
                              <p className="font-cinzel text-gold text-xs md:text-sm text-center font-bold drop-shadow-md">{character.name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </section>

              {/* --- CONTACT SECTION --- */}
              <section id="contact" className="min-h-screen bg-darkSteel py-20 px-8 relative border-t border-crimson/30 flex flex-col justify-center items-center">
                <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-crimson/10 to-transparent" />
                </ParallaxLayer>

                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <FadeIn>
                    <h2 className="font-cinzel font-bold text-5xl md:text-6xl text-gold mb-6">SEND A RAVEN</h2>
                    <p className="text-smokeGray text-lg mb-12">Have a grand project in mind? Let us forge something epic together.</p>
                  </FadeIn>
                               <FadeIn delay={0.2}>
                <a 
                  href="mailto:chatecaluba1030@gmail.com?subject=Portfolio Inquiry&body=Hi Chate, I loved your portfolio and would like to connect!" 
                  className="no-underline"
                >
                  <button className="bg-crimson text-boneWhite px-10 py-4 rounded-lg font-bold border border-gold hover:bg-gold hover:text-obsidian transition-all duration-300 shadow-[0_0_25px_rgba(138,28,28,0.7)] text-lg mb-12">
                    GET IN TOUCH
                  </button>
                </a>
              </FadeIn>
                  <FadeIn delay={0.4}>
                    <div className="flex justify-center gap-8 text-boneWhite font-inter">
                      <a href="#" className="hover:text-gold transition-colors duration-300">GitHub</a>
                      <span className="text-crimson">|</span>
                      <a href="#" className="hover:text-gold transition-colors duration-300">LinkedIn</a>
                      <span className="text-crimson">|</span>
                      <a href="#" className="hover:text-gold transition-colors duration-300">Email</a>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.6}>
                    <div className="mt-20 pt-8 border-t border-crimson/20 text-smokeGray text-sm">
                      <p>© 2026 Couvrei. Forged in React & Three.js.</p>
                    </div>
                  </FadeIn>
                </div>
              </section>
            </div>
          </SmoothScroll>
        } />
      </Routes>
    </Router>
  );
}

export default App;