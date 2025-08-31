'use client';

import React, { useEffect, useState } from 'react';
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ui/shadcn-io/ai/conversation';
import { Message, MessageAvatar, MessageContent } from '@/components/ui/shadcn-io/ai/message';
import { loadHistory } from '@/lib/storage';
import { nanoid } from 'nanoid';
import { TimeAgo } from '@/components/TimeAgo';

interface HistoryItem {
    id: string;
    imageUrl: string;
    prompt: string;
    style: string;
    createdAt: string;
}

export default function HistoryConversation() {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [messages, setMessages] = useState<
        {
            key: string;
            value: React.ReactNode; // 👈 allow JSX so we can embed image + text
            name: string;
            avatar: string;
            from: 'user' | 'assistant';
            createdAt?: string;
        }[]
    >([]);

    useEffect(() => {
        setItems(loadHistory());
        window.addEventListener('storage', () => setItems(loadHistory()));
        return () => window.removeEventListener('storage', () => setItems(loadHistory()));
    }, []);

    useEffect(() => {
        // Convert history into alternating user/assistant messages
        const formatted = items
            .slice()
            .reverse()
            .flatMap((item) => [
                {
                    key: nanoid(),
                    from: 'user' as const,
                    name: 'You',
                    avatar: 'https://github.com/dovazencot.png',
                    value: (
                        <div className="flex flex-col gap-2">
                            <img
                                src={item.imageUrl}
                                alt="Uploaded"
                                className="max-w-[200px] rounded-lg border"
                            />
                            <div className="text-sm">
                                <p>
                                    <span className="font-semibold">Prompt:</span> {item.prompt}
                                </p>
                                <p>
                                    <span className="font-semibold">Style:</span> {item.style}
                                </p>
                            </div>
                        </div>
                    ),
                    createdAt: item.createdAt,
                },
                {
                    key: nanoid(),
                    from: 'assistant' as const,
                    name: 'Assistant',
                    avatar: 'https://github.com/openai.png',
                    value: (
                        <div className="text-sm">
                            ✅ AI Response for: <span className="italic">{item.prompt}</span>
                        </div>
                    ),
                },
            ]);

        setMessages(formatted);
    }, [items]);

    if (messages.length === 0) return null;

    return (
        <Conversation className="relative size-full px-8 py-4 " style={{ height: '498px' }}>
            <ConversationContent>
                {messages.map(({ key, value, name, avatar, from, createdAt }) => (
                    <div key={key}>
                        <Message from={from}>
                            <MessageContent>{value}</MessageContent>
                            <MessageAvatar name={name} src={avatar} />
                        </Message>
                        {from === 'user' && <TimeAgo date={createdAt} />}
                    </div>
                ))}
            </ConversationContent>
            <ConversationScrollButton />
        </Conversation>
    );
}
