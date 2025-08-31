import { useEffect, useState } from 'react';

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function TimeAgo({ date }: { date: string }) {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => t + 1); // force re-render
        }, 60000); // every 60s
        return () => clearInterval(interval);
    }, []);

    return <span className="text-xs text-gray-400 flex justify-end">{formatTimeAgo(date)}</span>;
}
