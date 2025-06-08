import React from 'react';
import { Result, Button } from 'antd';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '50px', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Result
            status="500"
            title="系统错误"
            subTitle="抱歉，系统遇到了一个错误。请刷新页面重试。"
            extra={
              <div>
                <Button 
                  type="primary" 
                  onClick={() => window.location.reload()}
                  style={{ marginRight: 8 }}
                >
                  刷新页面
                </Button>
                <Button onClick={() => window.location.href = '/'}>
                  返回首页
                </Button>
                {process.env.NODE_ENV === 'development' && (
                  <details style={{ marginTop: 16, textAlign: 'left' }}>
                    <summary>错误详情（开发模式）</summary>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: 16, 
                      borderRadius: 4,
                      overflow: 'auto',
                      fontSize: '12px'
                    }}>
                      {this.state.error?.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 