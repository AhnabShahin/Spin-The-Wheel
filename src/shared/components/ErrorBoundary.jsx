import { Component } from '@wordpress/element';

/**
 * Error Boundary Component
 * Catches JavaScript errors and displays fallback UI
 */
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('STW Error Boundary caught an error:', error, errorInfo);
        }

        // Send error to analytics if available
        if (window.stwData?.config?.enable_error_tracking) {
            this.logError(error, errorInfo);
        }
    }

    logError = async (error, errorInfo) => {
        try {
            const errorData = {
                message: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            };

            // Send to WordPress REST API
            await fetch(`${window.stwData?.rest_url}stw/v1/error-log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': window.stwData?.rest_nonce
                },
                body: JSON.stringify(errorData)
            });
        } catch (logError) {
            console.error('Failed to log error:', logError);
        }
    };

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="stw-error-boundary">
                    <div className="stw-error-content">
                        <h2>Oops! Something went wrong</h2>
                        <p>
                            We're sorry, but something unexpected happened. 
                            Please try refreshing the page or contact support if the problem persists.
                        </p>
                        
                        <div className="stw-error-actions">
                            <button 
                                onClick={this.handleRetry}
                                className="button button-primary"
                            >
                                Try Again
                            </button>
                            <button 
                                onClick={() => window.location.reload()}
                                className="button"
                            >
                                Refresh Page
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && (
                            <details className="stw-error-details">
                                <summary>Error Details (Development)</summary>
                                <pre>{this.state.error && this.state.error.toString()}</pre>
                                <pre>{this.state.errorInfo.componentStack}</pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
