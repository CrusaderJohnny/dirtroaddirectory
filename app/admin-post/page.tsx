import {AppShell, AppShellHeader, AppShellMain, Card, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";

export default async function Page() {
    // const user = await currentUser();
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <Card shadow="lg" radius="md" withBorder w={"70rem"}>
                    </Card>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}