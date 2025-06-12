import {AppShell, AppShellHeader, AppShellMain, Card, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import VendorPostForm from "@/app/_components/postmanagement/vendorPostForm";
import {currentUser} from "@clerk/nextjs/server";

export default async function Page() {
    const user = await currentUser();
    const vendorName = user?.publicMetadata?.vendorName as string || "";
    const userId = user.id;
    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <Card shadow="lg" radius="md" withBorder w={"70rem"}>
                        <VendorPostForm vendorName={vendorName} userId={userId}/>
                    </Card>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}