// Daniel Asefa

'use client';

import { AppShell, BackgroundImage } from '@mantine/core';
import HeaderLarge from '@/app/_components/navcomps/HeaderLarge';
import HeaderSmall from '@/app/_components/navcomps/HeaderSmall';
import { useState, useEffect, useRef } from 'react';

export default function NavMT() {
    // The default header is set to the large header
    const [zoomedHeader, setZoomedHeader] = useState(false);
    // Ensures the correct header is only loaded after HeaderLarge is measured
    const [hasMeasured, setHasMeasured] = useState(false);
    const headerMeasureRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ref = headerMeasureRef.current;
        if (!ref) return;

        const updateHeaderSize = () => {
            const headerWidth = ref.offsetWidth;
            const screenWidth = window.innerWidth;
            const percentUsed = (headerWidth / screenWidth) * 100;

            const shouldUseCompact = screenWidth < 1375 || percentUsed > 95;
            setZoomedHeader(shouldUseCompact);
            setHasMeasured(true);
        };

        const observer = new ResizeObserver(updateHeaderSize);
        observer.observe(ref);

        window.addEventListener('resize', updateHeaderSize);
        updateHeaderSize();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateHeaderSize);
        };
    }, []);

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
                    {/* Always measure, never show this to users */}
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

                    {/* Show nothing until the measurement is complete */}
                    {hasMeasured && (
                        zoomedHeader ? <HeaderSmall /> : <HeaderLarge />
                    )}
                </BackgroundImage>
            </AppShell.Header>
        </AppShell>
    );
}

