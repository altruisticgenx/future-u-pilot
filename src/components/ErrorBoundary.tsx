import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("❌ ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="max-w-md text-center space-y-4 glass-card p-8 rounded-2xl border border-primary/20">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-foreground">
                Something went wrong
              </h1>
              <p className="text-muted-foreground text-sm">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="text-left text-xs text-muted-foreground bg-background/50 p-3 rounded overflow-auto max-h-40">
                  <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                  <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
              <div className="flex gap-3 justify-center pt-4">
                <Button onClick={() => window.location.href = "/"} variant="outline">
                  Go Home
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
