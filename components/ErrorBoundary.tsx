import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('ErrorBoundary caught error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    role="alert"
                    className="border border-red-500 bg-red-50 p-4 rounded text-red-700"
                >
                    <h2 className="font-semibold mb-2">Something went wrong.</h2>
                    <p>Please reload the page or try again.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
