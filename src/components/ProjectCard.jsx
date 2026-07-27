import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, techStack, height, image, status, link }) => {
  const isWip = status === 'wip';

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`bg-darkSteel border border-gold/30 rounded-lg overflow-hidden group cursor-pointer hover:border-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 ${height} flex flex-col`}
    >
      <div className="relative h-1/2 overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-crimson/20 to-gold/20 flex items-center justify-center">
            <span className="text-6xl">🐉</span>
          </div>
        )}
        
        {isWip && (
          <div className="absolute top-4 right-4 bg-amber-500/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300 backdrop-blur-sm z-10">
             In Progress
          </div>
        )}
        
        <div className={`absolute inset-0 bg-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${isWip ? 'pointer-events-none' : ''}`}>
          <span className="text-gold font-cinzel text-xl font-bold">
            {isWip ? 'Coming Soon' : 'View Project →'}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-cinzel font-bold text-2xl text-gold mb-3">{title}</h3>
          <p className="text-smokeGray text-sm mb-4">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-obsidian border border-gold/50 rounded-full text-xs text-boneWhite hover:border-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300">
              {tech}
            </span>
          ))}
        </div>

        {isWip ? (
          <button disabled className="w-full bg-gray-800 text-gray-500 px-6 py-3 rounded-lg font-bold border border-gray-700 cursor-not-allowed font-cinzel tracking-wider transition-all">
            COMING SOON
          </button>
        ) : (
          <a 
            href={link} 
            className="w-full bg-crimson text-boneWhite px-6 py-3 rounded-lg font-bold border border-gold hover:bg-gold hover:text-obsidian transition-all duration-300 font-cinzel tracking-wider text-center block shadow-[0_0_15px_rgba(138,28,28,0.6)]"
          >
            VIEW PROJECT →
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;