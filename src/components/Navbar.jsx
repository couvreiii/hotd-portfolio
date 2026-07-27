import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-5 bg-obsidian/70 backdrop-blur-md border-b border-crimson/20 transition-all duration-300">
      
      {/* Logo */}
      <a 
        href="#hero" 
        className="text-2xl font-cinzel font-bold text-gold tracking-wider hover:text-boneWhite transition-colors duration-300 cursor-pointer"
      >
        COUVREIII
      </a>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center space-x-8 text-boneWhite font-inter text-sm font-medium">
        <li>
          <a href="#projects" className="hover:text-gold transition-colors duration-300 cursor-pointer">
            Work
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-gold transition-colors duration-300 cursor-pointer">
            About
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-gold transition-colors duration-300 cursor-pointer">
            Contact
          </a>
        </li>
        <li className="pl-8 border-l border-crimson/30">
          <Link 
            to="/activities" 
            className="text-gold hover:text-boneWhite transition-colors duration-300 cursor-pointer flex items-center gap-2"
          >
            <span></span> 
          </Link>
        </li>
      </ul>

      {/* Call to Action Button (Mobile hidden, Desktop visible) */}
      <a 
        href="#contact"
        className="hidden md:block bg-crimson text-boneWhite px-6 py-2.5 rounded-md font-bold border border-gold/50 hover:bg-gold hover:text-obsidian transition-all duration-300 shadow-[0_0_15px_rgba(138,28,28,0.5)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] text-sm"
      >
        Let's Talk
      </a>
      
    </nav>
  );
};

export default Navbar;