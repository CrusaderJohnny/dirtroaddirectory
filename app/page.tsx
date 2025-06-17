"use client";
import {AppShell} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
// import WhatTheNews from "@/app/_components/newscomp/wtn";
import NewsPage from "@/app/news/page";


export default function Home() {
    // const isAdmin = await checkRole('admin');
    // const [opened] = useDisclosure();
    return (
        <AppShell
            // Removed NavBar in this AppShell - Dan
            // navbar={{
            //     width: 300,
            //     breakpoint: 'sm',
            //     collapsed: { mobile: !opened },
            // }}
        >
            <AppShell.Header
            component={NavMT}/>
            {/*<AppShell.Navbar component={SidebarDisplay} />*/}
            <AppShell.Main>
                <NewsPage/>
            </AppShell.Main>
        </AppShell>
    );
}
