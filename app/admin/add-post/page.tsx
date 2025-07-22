import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import AdminPostForm from "@/app/_components/postmanagement/adminPostForm";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {checkRole} from "@/_utils/roles";

export default async function Page() {
    const user = await currentUser();

    if(!user) {
        redirect("/");
    }

    if(!await checkRole('admin')) {
        redirect("/");
    }

    const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null;

    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <AdminPostForm currentUser={serializedUser}/>
                </Center>
            </AppShellMain>
            <AppShellFooter>
                <Center>
                    <Button component={'a'} href={'/admin'}>
                        Return to Admin Page
                    </Button>
                </Center>
            </AppShellFooter>
        </AppShell>
    )
}