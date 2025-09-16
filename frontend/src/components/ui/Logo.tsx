interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export function Logo({ size = 'md', variant = 'full', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl', 
    xl: 'text-3xl'
  };

  const LogoIcon = ({ className: iconClassName = '' }: { className?: string }) => (
    <div className={`${sizeClasses[size]} ${iconClassName} bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
      {/* Mountain silhouette */}
      <svg 
        viewBox="0 0 24 24" 
        className="w-3/5 h-3/5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-1 1.33L7 16l7-10z" />
        <path d="M5 16l3-4 1.5 2L5 16z" />
      </svg>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </div>
  );

  const LogoText = ({ className: textClassName = '' }: { className?: string }) => (
    <span className={`${textSizeClasses[size]} ${textClassName} font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent`}>
      WildGuide
    </span>
  );

  if (variant === 'icon') {
    return <LogoIcon className={className} />;
  }

  if (variant === 'text') {
    return <LogoText className={className} />;
  }

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}
