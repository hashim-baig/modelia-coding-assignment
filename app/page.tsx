'use client';

import { useState } from 'react';
import Preview from '@/components/Preview';
import History from '@/components/History';
import ErrorBoundary from '@/components/ErrorBoundary';
import PromptInputV2 from '@/components/PromptInputV2';
import HistoryConversation from '@/components/HistoryConversation';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Editorial');

    return (
        <ErrorBoundary>
            <main className="min-h-screen bg-gradient-subtle">
                {/* Grid layout: sidebar + main */}
                <div className="grid grid-cols-[400px_1fr] min-h-[calc(100vh-80px)]">
                    {/* Sidebar (sticky with its own scroll) */}
                    <aside className="border-r bg-white shadow-sm h-screen sticky top-0 p-4 flex flex-col overflow-y-auto">
                        <Preview image={image} prompt={prompt} style={style} />

                        <div className="mt-4 flex-1 ">
                            <History
                                onSelect={(item) => {
                                    setImage(item.imageUrl);
                                    setPrompt(item.prompt);
                                    setStyle(item.style);
                                }}
                            />
                        </div>
                    </aside>

                    {/* Main content (scrolls independently) */}
                    <section className="overflow-y-auto p-6">
                        <Toaster position="top-right" expand richColors closeButton />
                        <div className="flex flex-col gap-6 h-full">
                            <HistoryConversation />

                            <div className="justify-self-end-safe">
                                <PromptInputV2
                                    onImageSelect={setImage}
                                    style={style}
                                    setStyle={setStyle}
                                    prompt={prompt}
                                    setPrompt={setPrompt}
                                    image={image}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </ErrorBoundary>
    );
}
