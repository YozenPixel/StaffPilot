import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export default function Card({ children, className = '', hover = true, style }: CardProps) {
  return (
    <div
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
        hover ? 'hover:shadow-xl hover:-translate-y-1' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
