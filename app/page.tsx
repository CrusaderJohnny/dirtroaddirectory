import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import NewsPage from "@/app/news/page";


export default function Home() {
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
