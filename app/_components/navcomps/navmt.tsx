'use client';

import { AppShell, BackgroundImage } from '@mantine/core';
import HeaderLarge from '@/app/_components/navcomps/HeaderLarge';
import HeaderMedium from '@/app/_components/navcomps/HeaderMedium';
import HeaderSmall from '@/app/_components/navcomps/HeaderSmall';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export default function NavMT() {
    const [hydrated, setHydrated] = useState(false);

    // These breakpoints can be adjusted to match your actual breakpoints
    const isSmall = useMediaQuery('(max-width: 598px)');
    const isMedium = useMediaQuery('(min-width: 600px) and (max-width: 1500px)');

    useEffect(() => {
        // Wait until after hydration to avoid mismatch
        setHydrated(true);
    }, []);

    // Hide header completely until client is hydrated
    if (!hydrated) return null;

    let HeaderComponent = HeaderLarge;
    if (isSmall) {
        HeaderComponent = HeaderSmall;
    } else if (isMedium) {
        HeaderComponent = HeaderMedium;
    }

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
                    <HeaderComponent />
                </BackgroundImage>
            </AppShell.Header>
        </AppShell>
    );
}
