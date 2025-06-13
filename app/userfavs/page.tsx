import {AppShell, Container, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import UserFavs from "@/app/_components/usercomps/userfavs";
import data from "../_res/usermarkets.json";
import {currentUser} from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser();
    return (
        <AppShell
        >
            <AppShellHeader component={NavMT} />
            <AppShellMain>
                <Container size="xl" py="xl">
                    <Title order={1} className="text-3xl font-bold mb-6 text-center">{user?.firstName}&apos;s Favourites</Title>
                    <UserFavs data={data}/>
                </Container>
            </AppShellMain>
        </AppShell>
    )
}