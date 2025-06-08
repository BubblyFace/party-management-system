import React from 'react';
import type { ReactNode } from 'react';

interface ModuleContainerProps {
  title: string;
  description: string;
  icon: ReactNode;
  rightAction?: ReactNode;
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  children: ReactNode;
  className?: string;
  compact?: boolean; // 是否紧凑模式
}

const ModuleContainer: React.FC<ModuleContainerProps> = ({
  title,
  description,
  icon,
  rightAction,
  badge,
  children,
  className = '',
  compact = false
}) => {
  return (
    <div className={`${compact ? 'p-3' : 'p-4'} bg-gray-50 rounded-lg border border-gray-200 ${className} ${compact ? 'pb-4' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`${compact ? 'mb-3' : 'mb-4'} flex items-center justify-between`}>
          <div>
            <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-gray-900 ${compact ? 'mb-0.5' : 'mb-1'} flex items-center`}>
              {icon}
              {title}
            </h3>
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>{description}</p>
          </div>
          <div className="flex items-center gap-3">
            {badge && (
              <div className={`inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 ${compact ? 'text-xs' : 'text-xs'} font-medium`}>
                {badge.icon && (
                  <span className="w-3 h-3 mr-1.5">
                    {badge.icon}
                  </span>
                )}
                {badge.text}
              </div>
            )}
            {rightAction}
          </div>
        </div>

        {/* 内容区域 */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModuleContainer; 