# Portal 集成说明

## 概述

Portal页面已成功集成到党建管理系统中，作为系统的主要入口门户。

## 集成功能

### 1. 路由集成
- Portal页面现在可以通过 `/portal` 路径访问
- 系统默认首页已设置为Portal页面
- 在MainLayout的侧边栏中添加了"门户首页"导航选项

### 2. 功能卡片集成
Portal页面的dashboard卡片已更新为包含系统的主要功能模块：

- **工作概览** (`/dashboard`) - 查看整体工作状态、待办事项和统计数据
- **履职事项管理** (`/duty`) - 管理和跟踪党委履职工作事项
- **会议台账管理** (`/meeting`) - 管理党委会议记录和台账
- **教育学习管理** (`/education`) - 管理党员教育学习活动和记录
- **巡视整改管理** (`/inspection`) - 管理巡视整改项目和进度跟踪

### 3. 导航功能
- 点击功能卡片可直接导航到对应的管理页面
- 保留了原有的党建工作相关卡片作为展示内容
- 支持在各个页面之间无缝切换

## 技术实现

### 路由配置
```typescript
// 添加了Portal页面路由
{
  path: '/portal',
  element: (
    <LazyWrapper>
      <PortalApp />
    </LazyWrapper>
  ),
}
```

### 类型扩展
```typescript
// 扩展了DashboardCard类型以支持页面导航
export interface DashboardCard {
  // ... 其他属性
  path?: string; // 可选的导航路径
}
```

### 导航逻辑
```typescript
// 在Portal App中添加了导航处理
const handleCardClick = (cardId: string) => {
  const card = dashboardCards.find(c => c.id === cardId);
  if (card?.path) {
    navigate(card.path);
  }
};
```

## 使用方法

1. **访问Portal**: 打开系统后会自动跳转到Portal页面，或手动访问 `/portal`
2. **功能导航**: 点击任意功能卡片即可进入对应的管理页面
3. **返回Portal**: 在任意页面的侧边栏中点击"门户首页"即可返回Portal
4. **权限控制**: 管理功能页面仍然保持原有的权限控制机制

## 页面结构

```
/portal (Portal门户页面)
├── /dashboard (工作概览)
├── /duty (履职事项管理) - 需要管理员权限
├── /meeting (会议台账管理) - 需要管理员权限
├── /education (教育学习管理) - 需要管理员权限
└── /inspection (巡视整改管理) - 需要管理员权限
```

## 特性

- ✅ 响应式设计，支持各种屏幕尺寸
- ✅ 现代化UI设计，与系统整体风格保持一致
- ✅ 平滑的页面切换动画
- ✅ 保持原有的权限控制机制
- ✅ 支持懒加载，优化性能
- ✅ TypeScript类型安全 