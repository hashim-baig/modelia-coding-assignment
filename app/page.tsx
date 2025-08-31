'use client';
import { useState } from 'react';
import Preview from '@/components/Preview';
import History from '@/components/History';
import ErrorBoundary from '@/components/ErrorBoundary';
import HeroSection from '@/components/HeroSection';
import PromptInputV2 from '@/components/PromptInputV2';

export default function Home() {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('Editorial');

    return (
        <ErrorBoundary>
            <main className="min-h-screen bg-gradient-subtle">
                <HeroSection />
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col">
                        <History
                            onSelect={(item) => {
                                setImage(item.imageUrl);
                                setPrompt(item.prompt);
                                setStyle(item.style);
                            }}
                        />

                        <Preview image={image} prompt={prompt} style={style} />

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
            </main>
        </ErrorBoundary>
    );
}
