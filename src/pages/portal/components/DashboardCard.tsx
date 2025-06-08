import React from 'react';

interface DashboardCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  value: string | number;
  trend?: string;
  color: string;
  path?: string;
}

interface DashboardCardProps {
  card: DashboardCard;
  onClick?: (card: DashboardCard) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  card, 
  onClick
}) => {
  const getColorStyle = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50',
      slate: 'text-slate-600 bg-slate-50',
      green: 'text-green-600 bg-green-50',
      orange: 'text-orange-600 bg-orange-50',
      red: 'text-red-600 bg-red-50',
    };
    
    return colorMap[color as keyof typeof colorMap] || 'text-slate-600 bg-slate-50';
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-200',
      slate: 'bg-slate-200',
      green: 'bg-green-200',
      orange: 'bg-orange-200',
      red: 'bg-red-200',
    };
    
    return colorMap[color as keyof typeof colorMap] || 'bg-slate-200';
  };

  return (
    <div 
      className="group cursor-pointer bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5 h-44"
      onClick={() => onClick?.(card)}
    >
      {/* 头部区域 - 图标和趋势 */}
      <div className="flex items-start justify-between mb-3">
        <div className={`
          inline-flex items-center justify-center w-10 h-10 rounded-xl
          ${getColorStyle(card.color)}
        `}>
          <span className="text-lg font-semibold">
            {card.icon}
          </span>
        </div>
        {card.trend && (
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            {card.trend}
          </span>
        )}
      </div>

      {/* 标题区域 */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 leading-tight">
        {card.title}
      </h3>
      
      {/* 描述区域 */}
      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3 h-8">
        {card.description}
      </p>

      {/* 数值和底部装饰 */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900">
            {card.value}
          </span>
          <div className="text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* 底部进度条 */}
        <div 
          className={`
            w-full h-1 rounded-full ${getProgressColor(card.color)}
          `}
        />
      </div>
    </div>
  );
};

export default DashboardCard; 