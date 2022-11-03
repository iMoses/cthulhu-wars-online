import { styled } from '@linaria/react';
import { Component } from 'react';
import ioc from '@src/library/ioc';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    const { extraInfo } = this.props;
    ioc.session.reportError(
      {
        message: error.message.toString(),
        stack: errorInfo.componentStack.toString(),
        userAgent: navigator.userAgent,
      },
      typeof extraInfo === 'function' ? extraInfo(error, errorInfo) : extraInfo
    );
  }

  render() {
    if (this.state.error) {
      switch (typeof this.props.fallback) {
        case 'function':
          return this.props.fallback(this.state.error);
        case 'undefined':
          return <ErrorLayout title="Something went wrong, please try again" />;
        default:
          return this.props.fallback;
      }
    }
    return this.props.children;
  }
}

const ErrorLayout = styled.div``;
