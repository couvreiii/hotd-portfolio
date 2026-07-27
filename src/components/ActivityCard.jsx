import { Link } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  return (
    <Link to={activity.link} className="block group">
      <div 
        className="relative overflow-hidden rounded-xl border border-gold/30 bg-obsidian h-96 cursor-pointer transition-transform duration-300 group-hover:scale-105"
        style={{ 
          // This applies the dragon image as the background
          backgroundImage: `url(${activity.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay so text is readable over the dragon picture */}
        <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-300" />
        
        {/* Card Content */}
        <div className="relative h-full flex flex-col justify-between p-6 z-10">
          {/* Top Right Number */}
          <div className="flex justify-end">
            <span className="text-6xl font-cinzel text-gold/20 font-bold">
              0{activity.id}
            </span>
          </div>
          
          {/* Bottom Text */}
          <div>
            <h3 className="text-xl font-cinzel text-gold mb-1">{activity.title}</h3>
            <p className="text-sm text-boneWhite/80 mb-4">{activity.subtitle}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {activity.technologies.map((tech, index) => (
                <span key={index} className="text-xs px-2 py-1 rounded bg-gold/20 text-gold border border-gold/30">
                  {tech}
                </span>
              ))}
            </div>
            
            <p className="text-boneWhite font-cinzel text-lg group-hover:text-gold transition-colors">
              CLICK TO EXPLORE
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;