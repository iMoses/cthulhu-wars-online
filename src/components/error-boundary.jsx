import { Component } from 'react';
import ioc from '@src/ioc';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    ioc.engine.reportError(error, errorInfo, this.props.extraInfo);
  }

  render() {
    if (this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error);
      }
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
