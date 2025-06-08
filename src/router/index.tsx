import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoadingFallback from '../components/LoadingFallback';
import { UserStorage } from '../utils/storage';

// 懒加载页面组件
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const Login = React.lazy(() => import('../components/Login'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const DutyManagement = React.lazy(() => import('../pages/DutyManagement'));
const MeetingManagement = React.lazy(() => import('../pages/MeetingManagement'));
const EducationManagement = React.lazy(() => import('../pages/EducationManagement'));
const InspectionManagement = React.lazy(() => import('../pages/InspectionManagement'));
const PortalApp = React.lazy(() => import('../pages/portal/App'));

// 用户角色枚举
enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member'
}

// 加载组件包装器
const LazyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

// 路由守卫组件
interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: UserRole;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = true, 
  requireRole 
}) => {
  const currentUser = UserStorage.getCurrentUser();
  
  console.log('RouteGuard - currentUser:', currentUser);
  console.log('RouteGuard - requireAuth:', requireAuth);
  console.log('RouteGuard - requireRole:', requireRole);
  
  if (requireAuth && !currentUser) {
    console.log('RouteGuard - 未登录，跳转到login');
    return <Navigate to="/login" replace />;
  }
  
  if (requireRole && currentUser?.role !== requireRole) {
    console.log('RouteGuard - 权限不足，跳转到portal');
    return <Navigate to="/portal" replace />;
  }
  
  console.log('RouteGuard - 通过验证');
  return <>{children}</>;
};

// 登录页面守卫 - 防止已登录用户访问登录页
const LoginGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentUser = UserStorage.getCurrentUser();
  
  console.log('LoginGuard - currentUser:', currentUser);
  
  if (currentUser) {
    const redirectPath = currentUser.role === UserRole.ADMIN ? '/dashboard' : '/portal';
    console.log('LoginGuard - 已登录，跳转到', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }
  
  console.log('LoginGuard - 未登录，显示登录页');
  return <>{children}</>;
};

// 首页重定向组件 - 根据用户角色跳转到不同的门户首页
const HomeRedirect: React.FC = () => {
  const currentUser = UserStorage.getCurrentUser();
  
  console.log('HomeRedirect - currentUser:', currentUser);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser.role === UserRole.ADMIN) {
    console.log('HomeRedirect - 管理员，跳转到dashboard');
    return <Navigate to="/dashboard" replace />;
  } else {
    console.log('HomeRedirect - 党群主管，跳转到portal');
    return <Navigate to="/portal" replace />;
  }
};

// 创建路由配置
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <LoginGuard>
        <LazyWrapper>
          <Login />
        </LazyWrapper>
      </LoginGuard>
    ),
  },
  {
    path: '/',
    element: (
      <RouteGuard>
        <LazyWrapper>
          <MainLayout />
        </LazyWrapper>
      </RouteGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <RouteGuard>
            <LazyWrapper>
              <HomeRedirect />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'portal',
        element: (
          <RouteGuard requireRole={UserRole.MEMBER}>
            <LazyWrapper>
              <PortalApp />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <RouteGuard requireRole={UserRole.ADMIN}>
            <LazyWrapper>
              <Dashboard />
            </LazyWrapper>
          </RouteGuard>
        ),
      },
      {
        path: 'duty',
        element: (
          <LazyWrapper>
            <DutyManagement />
          </LazyWrapper>
        ),
      },
      {
        path: 'meeting',
        element: (
          <LazyWrapper>
            <MeetingManagement />
          </LazyWrapper>
        ),
      },
      {
        path: 'education',
        element: (
          <LazyWrapper>
            <EducationManagement />
          </LazyWrapper>
        ),
      },
      {
        path: 'inspection',
        element: (
          <LazyWrapper>
            <InspectionManagement />
          </LazyWrapper>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]); 