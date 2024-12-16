"use client";

import { Button } from "@mlplanner/app/_components/ui/button";
import React, { ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage?: string; // Optional for debugging
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error details to the console (or a logging service)
    console.error("Unexpected error caught in ErrorBoundary:", {
      error,
      errorInfo,
    });
    // Send error details to a monitoring service, if needed
    // e.g., Sentry.captureException(error);
  }

  handleRetry = (): void => {
    // Reset state to retry rendering the children
    this.setState({ hasError: false, errorMessage: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>An unexpected error occurred. Please try again later.</p>
          <Button onClick={this.handleRetry} style={{ padding: "0.5rem 1rem" }}>
            Retry
          </Button>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
