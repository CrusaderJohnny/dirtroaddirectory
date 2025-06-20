/*
Author: Daniel Asefa
website header using Mantine

References:
Gemini - "Provide Generic example for rendering code based on zoom level"

*/

"use client"

import { AppShell } from '@mantine/core';
import HeaderLarge from '@/app/_components/navcomps/HeaderLarge';
import HeaderSmall from '@/app/_components/navcomps/HeaderSmall';
import { useState, useEffect } from 'react';

export default function NavMT() {
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    useEffect(() => {
        const checkZoom = () => {
            setIsZoomedIn(window.devicePixelRatio > 1.25);
        };

        checkZoom();

        window.addEventListener('resize', checkZoom);

        return () => {
            window.removeEventListener('resize', checkZoom);
        };
    }, []);

    return (
        <AppShell
            header={{ height: 60 }}
        >
            <AppShell.Header>
                {isZoomedIn ? <HeaderSmall /> : <HeaderLarge />}
            </AppShell.Header>
        </AppShell>
    );
}