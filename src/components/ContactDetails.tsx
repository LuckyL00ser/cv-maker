import { Mail, Phone, Linkedin, Globe, Github, MapPin } from 'lucide-react';

// 1. Define the mapping for icons and URL logic
const contactConfig: Record<string, { icon: any; getHref?: (val: string) => string }> = {
  email: { 
    icon: Mail, 
    getHref: (val) => `mailto:${val}` 
  },
  phone: { 
    icon: Phone, 
    getHref: (val) => `tel:${val}` 
  },
  linkedin: { 
    icon: Linkedin, 
    getHref: (val) => val.includes('http') ? val : `https://linkedin.com/in/${val}` 
  },
  github: { 
    icon: Github, 
    getHref: (val) => val.includes('http') ? val : `https://github.com/${val}` 
  },
  website: { 
    icon: Globe, 
    getHref: (val) => val.includes('http') ? val : `https://${val}` 
  },
  location: { 
    icon: MapPin 
  },
};

// 2. The Refactored Component
export const ContactDetails = ({ details }: { details: Record<string, string> }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(details).map(([key, value]) => {
        const config = contactConfig[key.toLowerCase()];
        const Icon = config?.icon;
        const href = config?.getHref?.(value);

        if (!value) return null;

        return (
          <div key={key} className="flex items-center gap-2 text-sm text-gray-700">
            {Icon && <Icon size={16} className="text-gray-500 accent" />}
            
            {href ? (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                {value}
              </a>
            ) : (
              <span>{value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};