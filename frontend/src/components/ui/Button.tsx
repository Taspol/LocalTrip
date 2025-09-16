import { ButtonHTMLAttributes } from "react";
import { Icon } from './Icon';

type ButtonVariant = "default" | "primary" | "success" | "danger" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

const variants = {
  default: "bg-white border-gray-300 text-gray-700 hover:bg-wilderness-green-50 hover:border-wilderness-green-300 hover:text-wilderness-green-600 hover:shadow-md",
  primary: "bg-wilderness-green-600 border-transparent text-black hover:bg-wilderness-green-700 hover:text-black shadow-md hover:shadow-xl hover:shadow-wilderness-green-500/25",
  success: "bg-green-500 border-transparent text-white hover:bg-green-600 shadow-md hover:shadow-xl hover:shadow-green-500/25",
  danger: "bg-red-500 border-transparent text-white hover:bg-red-600 shadow-md hover:shadow-xl hover:shadow-red-500/25",
  outline: "bg-transparent border-wilderness-green-500 text-wilderness-green-500 hover:bg-wilderness-green-50 hover:border-wilderness-green-600 hover:shadow-lg",
  ghost: "bg-transparent border-transparent text-wilderness-green-600 hover:bg-wilderness-green-100 hover:shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5",
};

export function Button({ 
  className = "", 
  variant = "default", 
  size = "md", 
  loading = false,
  disabled,
  children,
  icon,
  iconPosition = 'left',
  ...props 
}: ButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <button
      className={`group inline-flex items-center justify-center rounded-md border font-medium transition-all duration-300 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-wilderness-green-500/50 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="animate-pulse">Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon name={icon} size={iconSizes[size]} className="transition-transform duration-200 group-hover:scale-110" />
          )}
          <span className="relative overflow-hidden">
            {children}
          </span>
          {icon && iconPosition === 'right' && (
            <Icon name={icon} size={iconSizes[size]} className="transition-transform duration-200 group-hover:scale-110" />
          )}
        </>
      )}
    </button>
  );
}

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  ariaLabel: string;
}

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className = "",
  ariaLabel,
  ...props
}: IconButtonProps) {
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  const buttonSizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      className={`group inline-flex items-center justify-center rounded-md border font-medium transition-all duration-300 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.05] hover:-translate-y-0.5 active:scale-[0.95] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-wilderness-green-500/50 focus:ring-offset-1 ${variants[variant]} ${buttonSizes[size]} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon name={icon} size={iconSizes[size]} className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3" />
    </button>
  );
}
