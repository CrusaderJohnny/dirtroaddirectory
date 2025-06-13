import {AppShell, AppShellHeader, AppShellMain, Card, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import AdminPostForm from "@/app/_components/postmanagement/adminPostForm";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {checkRole} from "@/utils/roles";

export default async function Page() {
    const user = await currentUser();

    if(!user) {
        redirect("/");
    }

    if(!checkRole('admin')) {
        redirect("/");
    }

    const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null;

    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center>
                    <Card shadow="lg" radius="md" withBorder w={"70rem"}>
                        <AdminPostForm user={serializedUser}/>
                    </Card>
                </Center>
            </AppShellMain>
        </AppShell>
    )
}