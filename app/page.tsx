import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
// import WhatTheNews from "@/app/_components/newscomp/wtn";
import NewsPage from "@/app/news/page";


export default function Home() {
    // const isAdmin = await checkRole('admin');
    // const [opened] = useDisclosure();
    return (
        <AppShell
        >
            <AppShellHeader
            component={NavMT}/>
            <AppShellMain>
                <NewsPage/>
            </AppShellMain>
        </AppShell>
    );
}
