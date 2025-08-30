'use client';
import { useState } from 'react';
import PromptInput from '@/components/PromptInput';
import Preview from '@/components/Preview';
import GenerateButton from '@/components/GenerateButton';
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
                    <div className="flex flex-col gap-8">
                        <PromptInput prompt={prompt} setPrompt={setPrompt} />

                        <Preview image={image} prompt={prompt} style={style} />

                        <GenerateButton image={image} prompt={prompt} style={style} />

                        <History
                            onSelect={(item) => {
                                setImage(item.imageUrl);
                                setPrompt(item.prompt);
                                setStyle(item.style);
                            }}
                        />

                        <PromptInputV2 onImageSelect={setImage} style={style} setStyle={setStyle} />
                    </div>
                </div>
            </main>
        </ErrorBoundary>
    );
}
