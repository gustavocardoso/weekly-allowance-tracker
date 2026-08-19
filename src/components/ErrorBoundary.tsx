import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, message: '' };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'Please refresh the page to continue.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error boundary', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
          <div className="max-w-md rounded-4xl bg-white p-6 text-center shadow-lg">
            <p className="text-lg font-bold">Oops! Something went wrong.</p>
            <p className="mt-2 text-sm text-slate-600">{this.state.message}</p>
            <button className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white" onClick={this.handleReload}>
              Reload app
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
