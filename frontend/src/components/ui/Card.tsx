'use client';

import { ReactNode } from "react";
import { Icon } from './Icon';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  icon?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'outline' | 'secondary';
  onClick?: () => void;
}

const paddings = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({ 
  children, 
  className = "", 
  hover = false, 
  padding = "md",
  icon,
  title,
  description,
  variant = 'default',
  onClick
}: CardProps) {
  const variants = {
    default: 'bg-white border-gray-200',
    outline: 'border-wilderness-green-200 bg-transparent hover:bg-wilderness-green-50',
    secondary: 'bg-wilderness-green-50 border-wilderness-green-200 text-wilderness-green-900'
  };
  
  const hoverClasses = hover ? "hover:shadow-xl hover:shadow-gray-200/50 hover:border-wilderness-green-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer" : "";
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] active:translate-y-0' : '';

  return (
    <div 
      className={`group rounded-xl border shadow-sm transition-all duration-300 ease-smooth ${variants[variant]} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {(icon || title) && (
        <div className={`flex items-center gap-3 ${paddings[padding]} pb-2`}>
          {icon && (
            <div className="flex-shrink-0 p-2 bg-wilderness-green-100 rounded-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-wilderness-green-200">
              <Icon name={icon} className="text-wilderness-green-600 transition-transform duration-200 group-hover:rotate-3" size={24} />
            </div>
          )}
          {title && (
            <div>
              <h3 className="font-semibold text-lg transition-colors duration-200 group-hover:text-wilderness-green-700">{title}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1 transition-colors duration-200 group-hover:text-wilderness-green-600">{description}</p>
              )}
            </div>
          )}
        </div>
      )}
      <div className={title || icon ? `px-${padding === 'sm' ? '3' : padding === 'md' ? '4' : '6'} pb-${padding === 'sm' ? '3' : padding === 'md' ? '4' : '6'}` : paddings[padding]}>
        {children}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  features?: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function FeatureCard({ icon, title, description, features, action }: FeatureCardProps) {
  return (
    <Card 
      variant="outline" 
      className="h-full group hover:shadow-xl hover:shadow-wilderness-green-100/50 hover:border-wilderness-green-300"
      onClick={action?.onClick}
      padding="lg"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-wilderness-green-100 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-wilderness-green-200 group-hover:shadow-lg">
          <Icon name={icon} className="text-wilderness-green-600 transition-transform duration-300 group-hover:rotate-6" size={28} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-xl mb-2 text-wilderness-green-900 transition-colors duration-200 group-hover:text-wilderness-green-700">{title}</h3>
          <p className="text-gray-600 mb-4 transition-colors duration-200 group-hover:text-gray-700">{description}</p>
          
          {features && features.length > 0 && (
            <ul className="space-y-2 mb-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-200 hover:text-wilderness-green-600 hover:translate-x-1" style={{ animationDelay: `${index * 100}ms` }}>
                  <Icon name="check" className="text-wilderness-green-500 transition-transform duration-200 hover:scale-125" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          
          {action && (
            <button className="w-full mt-4 px-4 py-2 bg-wilderness-green-600 text-white rounded-lg hover:bg-wilderness-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 font-medium active:scale-95">
              {action.label}
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

interface StatsCardProps {
  icon: string;
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  description?: string;
}

export function StatsCard({ icon, title, value, change, description }: StatsCardProps) {
  return (
    <Card variant="secondary" padding="lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-wilderness-green-700">{title}</p>
          <p className="text-3xl font-bold text-wilderness-green-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
              {change.positive ? '+' : ''}{change.value}
            </p>
          )}
          {description && (
            <p className="text-xs text-wilderness-green-600 mt-1">{description}</p>
          )}
        </div>
        <div className="p-3 bg-wilderness-green-200 rounded-full">
          <Icon name={icon} className="text-wilderness-green-700" size={24} />
        </div>
      </div>
    </Card>
  );
}
