"use client";
import {AppShell, Container, Title} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import {useUser} from "@clerk/nextjs";
import UserFavs from "@/app/_components/usercomps/userfavs";
import data from "../_res/usermarkets.json";

export default function Page() {
    const user = useUser();
    return (
        <AppShell
        >
            <AppShell.Header component={NavMT}/>
            <AppShell.Main>
                <Container size="xl" py="xl">
                    <Title order={1} className="text-3xl font-bold mb-6 text-center">{user.user?.firstName}&apos;s Favourites</Title>
                    <UserFavs data={data}/>
                </Container>
            </AppShell.Main>
        </AppShell>
    )
}