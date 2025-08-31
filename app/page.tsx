'use client';

import { useState } from 'react';
import Preview from '@/components/Preview';
import History from '@/components/History';
import ErrorBoundary from '@/components/ErrorBoundary';
import HeroSection from '@/components/HeroSection';
import PromptInputV2 from '@/components/PromptInputV2';
import HistoryConversation from '@/components/HistoryConversation';

export default function Home() {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Editorial');

    return (
        <ErrorBoundary>
            <main className="min-h-screen bg-gradient-subtle">
                <HeroSection />

                {/* Grid layout: sidebar + main */}
                <div className="grid grid-cols-[300px_1fr] min-h-[calc(100vh-80px)]">
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
                        <div className="flex flex-col gap-6">
                            <HistoryConversation />
                            <PromptInputV2
                                onImageSelect={setImage}
                                style={style}
                                setStyle={setStyle}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                image={image}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </ErrorBoundary>
    );
}
