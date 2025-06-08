# 🚀 党建管理系统部署指南

## 📋 概述

本指南将帮助您将党建管理系统部署到GitHub和Vercel，让系统可以通过URL在线访问。

## 🔧 前置条件

- GitHub账户
- Vercel账户（可使用GitHub登录）
- Git已安装并配置

## 📚 部署步骤

### 1. 创建GitHub仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `party-management-system`
   - **Description**: `党建管理系统 - 综合党委工作管理平台`
   - **Visibility**: 选择 Public（公开）或 Private（私有）
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 2. 推送代码到GitHub

在项目目录中执行以下命令：

```bash
# 添加远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/party-management-system.git

# 推送代码到GitHub
git push -u origin main
```

### 3. 部署到Vercel

#### 方法一：通过Vercel网站部署（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账户登录
3. 点击 "New Project"
4. 选择刚创建的 `party-management-system` 仓库
5. Vercel会自动检测到这是一个Vite项目
6. 确认配置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. 点击 "Deploy"

#### 方法二：通过Vercel CLI部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 部署到生产环境
vercel --prod
```

### 4. 配置自定义域名（可选）

1. 在Vercel项目面板中，点击 "Settings"
2. 选择 "Domains"
3. 添加您的自定义域名
4. 按照Vercel提供的DNS配置指南配置域名

## 🌐 访问地址

部署完成后，您将获得以下访问地址：

- **Vercel提供的域名**: `https://party-management-system-xxx.vercel.app`
- **自定义域名**（如已配置）: `https://your-domain.com`

## 🔑 测试账户

系统提供以下测试账户：

### 管理员账户
- **用户名**: `admin`
- **密码**: `admin123`
- **权限**: 访问所有功能模块

### 普通用户账户
- **用户名**: `member`
- **密码**: `member123`
- **权限**: 仅访问门户页面

## 📊 功能特性

✅ **完整的党建工作管理平台**
- 履职事项管理
- 会议台账管理
- 教育学习管理
- 巡视整改管理

✅ **数据驾驶舱**
- 11个地区党建工作数据展示
- 实时数据可视化
- 智能分析功能

✅ **响应式设计**
- 支持PC、平板、手机访问
- 现代化UI界面
- 优秀的用户体验

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件库**: Ant Design 5
- **样式框架**: Tailwind CSS 4
- **图表库**: @ant-design/charts
- **构建工具**: Vite 6
- **路由**: React Router DOM 7

## 🔄 自动部署

设置完成后，每次推送代码到GitHub主分支时，Vercel会自动重新部署应用。

## 📝 注意事项

1. 确保所有依赖都已正确安装
2. 检查构建过程中是否有警告或错误
3. 测试所有功能模块是否正常工作
4. 确认路由配置正确，避免页面刷新404错误

## 🆘 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本（需要>=16.0.0）
   - 运行 `npm install` 重新安装依赖
   - 检查TypeScript错误

2. **路由404错误**
   - 确认vercel.json配置正确
   - 检查路由重写规则

3. **样式显示异常**
   - 确认Tailwind CSS配置正确
   - 检查CSS构建过程

## 📞 技术支持

如遇到部署问题，请检查：
- [Vercel文档](https://vercel.com/docs)
- [Vite文档](https://vitejs.dev/)
- [React文档](https://react.dev/)

---

🎉 **恭喜！您的党建管理系统已成功部署！** 