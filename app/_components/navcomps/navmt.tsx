'use client';

import { AppShell, BackgroundImage } from '@mantine/core';
import HeaderLarge from '@/app/_components/navcomps/HeaderLarge';
import HeaderSmall from '@/app/_components/navcomps/HeaderSmall';
import { useState, useEffect, useRef } from 'react';

export default function NavMT() {
    const [zoomedHeader, setZoomedHeader] = useState(false);
    const headerMeasureRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ref = headerMeasureRef.current;
        if (!ref) return;

        const updateZoomed = () => {
            const headerWidth = ref.offsetWidth;
            const screenWidth = window.innerWidth;
            const percentUsed = (headerWidth / screenWidth) * 100;

            if (!zoomedHeader && percentUsed > 95) {
                setZoomedHeader(true);
            } else if (zoomedHeader && percentUsed < 90) {
                setZoomedHeader(false);
            }
        };

        const observer = new ResizeObserver(updateZoomed);
        observer.observe(ref);

        window.addEventListener('resize', updateZoomed);
        updateZoomed();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateZoomed);
        };
    }, [zoomedHeader]);

    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
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
                    {/* Measuring element - always present, invisible */}
                    <div
                        ref={headerMeasureRef}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            pointerEvents: 'none',
                            zIndex: -1,
                            visibility: 'hidden',
                        }}
                    >
                        <HeaderLarge />
                    </div>

                    {/* Shown Header */}
                    {zoomedHeader ? <HeaderSmall /> : <HeaderLarge />}
                </BackgroundImage>
            </AppShell.Header>
        </AppShell>
    );
}
