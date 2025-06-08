export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-red-200/30 bg-gradient-to-r from-red-600 via-red-500 to-red-600 backdrop-blur-xl relative overflow-hidden">
      {/* 党建特色背景装饰 */}
      <div className="absolute inset-0 opacity-10">
        {/* 红旗飘扬效果 */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-300/20 via-transparent to-transparent"></div>
        {/* 党徽图案 */}
        <div className="absolute top-1 right-4 w-8 h-8 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-300 fill-current">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" fill="currentColor"/>
          </svg>
        </div>
        {/* 建筑剪影装饰 */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-12">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-red-700 font-bold text-xs shadow-lg border border-yellow-300">
                党
              </div>
              <div>
                <h1 className="text-base font-semibold text-white drop-shadow-sm">党委工作管理系统</h1>
                <p className="text-xs text-red-100 leading-none">Party Committee Management System</p>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {/* Welcome Message */}
            <div className="hidden sm:block text-xs text-red-100">
              欢迎使用党委门户系统
            </div>
            
            {/* User Avatar */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-xs bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg px-2 py-1.5 transition-all duration-200 backdrop-blur-sm">
                <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-red-700 text-xs font-bold shadow-sm">
                  管
                </div>
                <span className="text-white font-medium">管理员</span>
                <svg className="w-3 h-3 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>
    </header>
  );
}
