'use client';

import { AppShell, BackgroundImage } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import HeaderLarge from '@/app/_components/navcomps/HeaderLarge';
import HeaderMedium from '@/app/_components/navcomps/HeaderMedium';
import HeaderSmall from '@/app/_components/navcomps/HeaderSmall';
import { useUser } from '@clerk/nextjs';

export default function NavMT() {
    const [selectedHeader, setSelectedHeader] = useState<null | 'large' | 'medium' | 'small'>(null);
    const largeRef = useRef<HTMLDivElement>(null);
    const mediumRef = useRef<HTMLDivElement>(null);
    const smallRef = useRef<HTMLDivElement>(null);
    const { isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded) return;

        const timeout = setTimeout(() => {
            const getWidth = (ref: React.RefObject<HTMLDivElement | null>): number =>
                ref.current?.offsetWidth ?? Infinity;

            const measureHeaders = () => {
                const container = document.body; // or a specific wrapper div
                const screenWidth = container.clientWidth;
                const largeW = getWidth(largeRef);
                const mediumW = getWidth(mediumRef);
                console.log({
                    large: largeRef.current?.offsetWidth,
                    medium: mediumRef.current?.offsetWidth,
                    screen: window.innerWidth
                });

                // This works at 80 % on a
                if (largeW / screenWidth < 0.80) {
                    setSelectedHeader('large');
                } else if (mediumW / screenWidth < 0.70) {
                    setSelectedHeader('medium');
                } else {
                    setSelectedHeader('small');
                }
            };

            const observer = new ResizeObserver(measureHeaders);
            if (largeRef.current) observer.observe(largeRef.current);
            if (mediumRef.current) observer.observe(mediumRef.current);
            if (smallRef.current) observer.observe(smallRef.current);

            window.addEventListener('resize', measureHeaders);
            measureHeaders();

            return () => {
                observer.disconnect();
                window.removeEventListener('resize', measureHeaders);
            };
        }, 100); // Allow DOM/user content to settle

        return () => clearTimeout(timeout);
    }, [isLoaded]);

    const renderHeader = () => {
        switch (selectedHeader) {
            case 'large':
                return <HeaderLarge />;
            case 'medium':
                return <HeaderMedium />;
            case 'small':
                return <HeaderSmall />;
            default:
                return null;
        }
    };

    if (!isLoaded) return null;

    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header withBorder={false} >
                <BackgroundImage
                    src="https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2024/05/15165226/dirt-road.jpeg"
                    style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 3vh',
                        backgroundPosition: '500% 80%',
                        position: 'relative',
                    }}
                >
                    {/* Hidden headers for width measurement */}
                    <div
                        ref={largeRef}
                        style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            pointerEvents: 'none',
                            opacity: 0,
                            zIndex: -1,
                        }}
                    >
                        <HeaderLarge />
                    </div>
                    <div
                        ref={mediumRef}
                        style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            pointerEvents: 'none',
                            opacity: 0,
                            zIndex: -1,
                        }}
                    >
                        <HeaderMedium />
                    </div>
                    <div
                        ref={smallRef}
                        style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            pointerEvents: 'none',
                            opacity: 0,
                            zIndex: -1,
                        }}
                    >
                        <HeaderSmall />
                    </div>

                    {/* Actual header to display */}
                    {renderHeader()}
                </BackgroundImage>
            </AppShell.Header>
        </AppShell>
    );
}