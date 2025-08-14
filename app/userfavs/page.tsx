import {AppShell, AppShellHeader, AppShellMain} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import UserFavouritePage from "@/app/_components/usercomps/userFavouritesPage";

export default async function Page() {
    const user = await currentUser();
    if(!user) {
        redirect('/');
    }
    return (
        <AppShell
        >
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <UserFavouritePage />
            </AppShellMain>
        </AppShell>
    )
}