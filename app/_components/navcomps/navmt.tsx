/*
Author: Daniel Asefa
website header using Mantine

References:
Gemini
    "Provide Generic example for rendering code based on zoom level"

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
            // A devicePixelRatio greater than 1 often indicates zoom or a high-DPI screen.
            // You might need to adjust the threshold (e.g., 1.1, 1.25) based on your testing.
            setIsZoomedIn(window.devicePixelRatio > 1.4);
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