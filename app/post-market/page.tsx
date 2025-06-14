import MarketPostForm from "@/app/_components/postmanagement/marketPostForm";
import {checkMarket} from "@/utils/checkMarket";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs/server";
import {AppShell, AppShellHeader, AppShellMain, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default async function Page() {
    const user = await currentUser();

    if(!user) {
        redirect("/");
    }

    if(!checkMarket()) {
        redirect("/");
    }

    const marketName = user?.publicMetadata?.marketName as string || "";
    const userId = user.id;

    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <MarketPostForm marketName={marketName} userId={userId}/>
                </Center>
            </AppShellMain>
        </AppShell>

    )
}