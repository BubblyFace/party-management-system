export default function HeroSection() {
  return (
    <section 
      className="relative overflow-hidden border-b border-red-200/30"
      style={{
        background: 'linear-gradient(135deg, #f8e8e6 0%, #fef5f5 25%, #fff7ed 100%)'
      }}
    >
      {/* 党建主题背景装饰 */}
      <div className="absolute inset-0">
        {/* 主背景渐变 */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(215, 53, 39, 0.1) 0%, rgba(215, 53, 39, 0.05) 50%, rgba(234, 88, 12, 0.1) 100%)'
          }}
        ></div>
        
        {/* 华表底纹装饰 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03]">
          {/* 左侧华表 */}
          <div className="absolute top-0 left-16 w-8 h-full">
            <svg viewBox="0 0 100 400" className="w-full h-full fill-current" style={{ color: '#d73527' }}>
              {/* 华表柱身 */}
              <rect x="40" y="0" width="20" height="400" fill="currentColor"/>
              {/* 华表顶部 */}
              <circle cx="50" cy="20" r="15" fill="currentColor"/>
              {/* 华表装饰圈 */}
              <circle cx="50" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="200" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="300" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              {/* 华表底座 */}
              <rect x="30" y="380" width="40" height="20" fill="currentColor"/>
            </svg>
          </div>
          
          {/* 右侧华表 */}
          <div className="absolute top-0 right-16 w-8 h-full">
            <svg viewBox="0 0 100 400" className="w-full h-full fill-current" style={{ color: '#c2410c' }}>
              {/* 华表柱身 */}
              <rect x="40" y="0" width="20" height="400" fill="currentColor"/>
              {/* 华表顶部 */}
              <circle cx="50" cy="20" r="15" fill="currentColor"/>
              {/* 华表装饰圈 */}
              <circle cx="50" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="200" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="300" r="25" fill="none" stroke="currentColor" strokeWidth="3"/>
              {/* 华表底座 */}
              <rect x="30" y="380" width="40" height="20" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* 党徽底纹网格 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.04]">
          {/* 中央大党徽 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#d73527' }}>
              <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" fill="none"/>
              {/* 五角星 */}
              <path d="M50 20 L58 40 L80 40 L64 52 L70 72 L50 60 L30 72 L36 52 L20 40 L42 40 Z" fill="currentColor"/>
              {/* 镰刀锤头 */}
              <path d="M35 60 Q40 65 45 60 Q40 55 35 60" fill="currentColor"/>
              <path d="M55 60 L65 50 L67 52 L57 62 L55 60" fill="currentColor"/>
            </svg>
          </div>
          
          {/* 散布的小党徽 */}
          <div className="absolute top-8 left-32 w-6 h-6">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#ef4444' }}>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute top-16 right-32 w-8 h-8">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#f97316' }}>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute bottom-12 left-24 w-5 h-5">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#f87171' }}>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div className="absolute bottom-8 right-28 w-7 h-7">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#fb923c' }}>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* 装饰性图案 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* 左侧党徽装饰 */}
          <div className="absolute top-4 left-8 w-12 h-12 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#d73527' }}>
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* 右侧党徽装饰 */}
          <div className="absolute top-6 right-12 w-10 h-10 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current" style={{ color: '#ea580c' }}>
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
            </svg>
          </div>
          
          {/* 天安门剪影装饰 */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-6 opacity-[0.06]">
            <svg viewBox="0 0 200 50" className="w-full h-full fill-current" style={{ color: '#d73527' }}>
              {/* 天安门城楼简化轮廓 */}
              <rect x="20" y="30" width="160" height="20" fill="currentColor"/>
              <rect x="40" y="20" width="120" height="30" fill="currentColor"/>
              <rect x="60" y="10" width="80" height="40" fill="currentColor"/>
              {/* 城门 */}
              <rect x="90" y="25" width="20" height="25" fill="white"/>
            </svg>
          </div>
          
          {/* 底部装饰波浪 */}
          <div className="absolute bottom-0 left-0 w-full h-8">
            <svg viewBox="0 0 1200 120" className="w-full h-full fill-current" style={{ color: 'rgba(254, 242, 242, 0.3)' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        <div className="text-center">
          {/* 党建标语徽章 */}
          <div 
            className="inline-flex items-center px-4 py-2 border border-red-200 rounded-full text-xs font-medium mb-3 shadow-sm font-chinese"
            style={{
              background: 'linear-gradient(to right, #f8e8e6, #fff7ed)',
              color: '#d73527'
            }}
          >
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#d73527' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span 
              className="font-semibold"
              style={{
                background: 'linear-gradient(to right, #d73527, #b91c1c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#d73527' // 备用颜色，当渐变不支持时显示
              }}
            >
              坚定理想信念宗旨，坚持党的群众路线
            </span>
          </div>
          
          {/* 主标题 */}
          <h1 
            className="text-2xl font-bold mb-2 drop-shadow-sm font-chinese"
            style={{
              background: 'linear-gradient(to right, #d73527, #b91c1c, #d73527)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: '#d73527' // 备用颜色，当渐变不支持时显示
            }}
          >
            党委工作管理系统
          </h1>
          
          {/* 副标题描述 */}
          <p className="text-sm max-w-2xl mx-auto leading-relaxed font-medium font-chinese" style={{ color: 'rgba(215, 53, 39, 0.8)' }}>
            扎实深入推进党的群众路线教育实践活动和党中央决策部署，全面贯彻落实各项工作要求
          </p>

          {/* 装饰性分割线 */}
          <div className="mt-4 flex justify-center">
            <div 
              className="w-16 h-0.5 rounded-full shadow-sm"
              style={{
                background: 'linear-gradient(to right, #d73527, #f97316, #d73527)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 底部渐变遮罩 */}
      <div 
        className="absolute bottom-0 left-0 w-full h-2"
        style={{
          background: 'linear-gradient(to top, white, rgba(248, 232, 230, 0.5), transparent)'
        }}
      ></div>
    </section>
  );
} 