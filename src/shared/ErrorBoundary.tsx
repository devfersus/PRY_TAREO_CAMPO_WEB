import React, { Component, type ReactNode }  from 'react';

interface Props{
 fallback: ReactNode;
 children: ReactNode;
}

export class ErrorBoundary extends Component<Props> {

    state: {hasError: boolean } = {hasError: false};

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: React.ErrorInfo) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    //logErrorToMyService(
    //  error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
    //  info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
    //  React.captureOwnerStack(),
    //);
    console.log({error, info});
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}