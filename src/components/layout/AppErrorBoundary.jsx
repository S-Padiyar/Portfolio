import React from "react";

/** Prevent an unexpected rendering failure from leaving visitors on a blank page. */
export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio rendering failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <h1>Portfolio unavailable</h1>
          <p>Something went wrong while loading this page. Please refresh and try again.</p>
        </main>
      );
    }
    return this.props.children;
  }
}
