# 党建管理系统部署指南

## 开发环境部署

### 前置要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 部署步骤

1. **克隆项目**
```bash
git clone <项目地址>
cd party-management-system
```

2. **安装依赖**
```bash
npm install
# 或使用 yarn
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或使用 yarn
yarn dev
```

4. **访问应用**
打开浏览器访问: `http://localhost:5173`

## 生产环境部署

### 方式一：静态文件部署

1. **构建生产版本**
```bash
npm run build
```

2. **部署文件**
将 `dist` 目录中的文件部署到Web服务器：
- Apache
- Nginx
- IIS
- 或任何静态文件服务器

### 方式二：Docker部署

1. **创建 Dockerfile**
```dockerfile
# 构建阶段
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **创建 nginx.conf**
```nginx
events {}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

3. **构建和运行Docker容器**
```bash
# 构建镜像
docker build -t party-management-system .

# 运行容器
docker run -d -p 80:80 --name party-system party-management-system
```

### 方式三：Vercel部署

1. **安装Vercel CLI**
```bash
npm i -g vercel
```

2. **部署**
```bash
vercel --prod
```

### 方式四：Netlify部署

1. **构建项目**
```bash
npm run build
```

2. **上传到Netlify**
- 登录 Netlify
- 拖拽 `dist` 目录到部署区域
- 或连接Git仓库自动部署

## 环境变量配置

如需配置环境变量，在项目根目录创建相应的环境文件：

### 开发环境 (.env.development)
```env
VITE_APP_TITLE=党建管理系统
VITE_API_BASE_URL=http://localhost:3000/api
```

### 生产环境 (.env.production)
```env
VITE_APP_TITLE=党建管理系统
VITE_API_BASE_URL=https://your-api-domain.com/api
```

## Web服务器配置

### Nginx配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    # 支持单页应用路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/xml+rss 
               application/json;
}
```

### Apache配置示例
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dist
    
    <Directory /path/to/dist>
        Options -Indexes
        AllowOverride All
        Require all granted
    </Directory>

    # 支持单页应用路由
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>
</VirtualHost>
```

## 性能优化建议

### 1. 启用压缩
确保Web服务器启用了gzip或brotli压缩。

### 2. 缓存策略
- HTML文件：不缓存或短期缓存
- JS/CSS文件：长期缓存（1年）
- 图片文件：长期缓存

### 3. CDN加速
考虑使用CDN服务来加速静态资源加载。

### 4. 代码分割
项目已配置了代码分割，大型chunks会自动分离。

## 监控与维护

### 1. 日志监控
配置Web服务器日志收集：
```bash
# Nginx日志格式
log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent" "$http_x_forwarded_for"';
```

### 2. 性能监控
考虑集成以下监控工具：
- Google Analytics
- 百度统计
- 腾讯分析

### 3. 错误监控
集成错误监控服务：
- Sentry
- 腾讯云前端性能监控

## 安全考虑

### 1. HTTPS配置
生产环境必须启用HTTPS：
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

### 2. 安全头配置
```nginx
# 安全头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 故障排查

### 常见问题
1. **白屏问题**：检查路径配置和控制台错误
2. **路由404**：确保服务器配置了SPA路由回退
3. **资源加载失败**：检查静态资源路径和CDN配置

### 调试方法
```bash
# 检查构建输出
npm run build -- --debug

# 本地预览生产版本
npm run preview

# 类型检查
npm run type-check
```

---

**注意：** 本部署指南基于当前系统架构。如有特殊需求，请根据实际情况调整配置。 