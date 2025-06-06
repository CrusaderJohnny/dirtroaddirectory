"use client";
import {AppShell} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import SidebarDisplay from "@/app/_components/newscomp/sidebarDisplay";
import {useDisclosure} from "@mantine/hooks";
import WhatTheNews from "@/app/_components/newscomp/wtn";


export default function Home() {
    // const isAdmin = await checkRole('admin');
    const [opened] = useDisclosure();
    return (
        <AppShell
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header
            component={NavMT}/>
            <AppShell.Navbar
                component={SidebarDisplay}
            />
            <AppShell.Main>
                <WhatTheNews/>
            </AppShell.Main>
        </AppShell>
    );
}
