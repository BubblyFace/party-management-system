# 党建管理系统

## 项目简介

党建管理系统是一个专为党委组织设计的综合管理平台，支持履职事项管理、会议台账管理、教育学习管理和巡视整改管理等核心功能。系统采用现代化的Web技术栈，提供直观易用的用户界面和完整的数据管理功能。

## 功能特性

### 🏛️ 角色管理
- **党委成员**：查看个人工作概览，管理分配的履职事项
- **管理员**：全面管理各类台账，分配和督办工作任务

### 📋 履职事项管理
- 工作任务的创建、分配和跟踪
- 优先级设置（高/中/低）
- 进度跟踪和状态管理
- 逾期提醒和完成统计

### 📅 会议台账管理
- 会议信息的录入和管理
- 参与人员管理
- 会议决议记录
- 会议状态跟踪

### 📚 教育学习管理
- 多种学习类型支持（理论学习、实践活动、讨论交流、考试测评）
- 学习时长和地点记录
- 参与人员管理
- 学习总结归档

### 🔍 巡视整改管理
- 问题发现和整改措施制定
- 责任人分配和督办
- 整改进度跟踪
- 完成情况统计

### 📊 数据概览
- 工作完成情况统计
- 个人工作概览
- 多维度数据展示
- 实时进度监控

## 技术栈

- **前端框架**：React 18 + TypeScript
- **UI组件库**：Ant Design 5.x
- **构建工具**：Vite
- **数据存储**：LocalStorage（前端演示）
- **日期处理**：Day.js
- **开发语言**：TypeScript

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装与运行

1. **克隆项目**
```bash
git clone <项目地址>
cd party-management-system
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
打开浏览器访问 `http://localhost:5173`

### 构建生产版本
```bash
npm run build
```

## 系统使用指南

### 登录系统
系统提供了预设的测试用户账号：

**管理员账号：**
- 管理员（省级）- 省委办公厅
- 管理员（市级）- 市委办公室  
- 管理员（县级）- 县委办公室

**党委成员账号：**
- 张书记 - 省委组织部
- 李主任 - 市委宣传部
- 王县长 - 县委办公室

### 系统导航
- **工作概览**：查看个人或全局工作统计
- **履职事项管理**：管理工作任务和履职事项
- **会议台账管理**：管理会议信息和决议
- **教育学习管理**：管理学习活动和记录
- **巡视整改管理**：管理整改项目和进度

### 数据管理
- 所有数据存储在浏览器本地存储中
- 支持数据的增删改查操作
- 数据在浏览器会话间保持持久化

## 项目结构

```
party-management-system/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   │   ├── AdminPanel.tsx     # 管理员主面板
│   │   ├── Dashboard.tsx      # 工作概览
│   │   ├── Login.tsx          # 登录页面
│   │   ├── DutyManagement.tsx # 履职事项管理
│   │   ├── MeetingManagement.tsx # 会议台账管理
│   │   ├── EducationManagement.tsx # 教育学习管理
│   │   └── InspectionManagement.tsx # 巡视整改管理
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   ├── storage.ts         # 本地存储工具
│   │   └── mockData.ts        # 模拟数据
│   ├── App.tsx             # 应用主组件
│   └── main.tsx            # 应用入口
├── package.json            # 项目配置
├── tsconfig.json          # TypeScript配置
├── vite.config.ts         # Vite配置
└── README.md              # 项目说明
```

## 核心组件说明

### 类型定义 (types/index.ts)
- 定义了用户、履职事项、会议、教育记录、巡视整改等核心数据类型
- 包含角色、优先级、状态等枚举类型

### 存储工具 (utils/storage.ts)
- 封装了LocalStorage操作
- 提供了各类数据的CRUD操作接口
- 支持用户会话管理

### 模拟数据 (utils/mockData.ts)
- 提供了系统初始化数据
- 包含测试用户和示例数据
- 支持数据重置功能

## 开发特性

- **TypeScript支持**：完整的类型检查和IntelliSense
- **组件化开发**：模块化的React组件架构
- **响应式设计**：适配桌面和移动设备
- **国际化支持**：支持中文界面
- **数据持久化**：本地数据存储和会话管理

## 浏览器兼容性

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues：[GitHub Issues](链接)
- 邮箱：751835145@qq.com

---

**注意**：本系统为演示版本，使用本地存储。生产环境建议集成后端数据库和用户认证系统。
