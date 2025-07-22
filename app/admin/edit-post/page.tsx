import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
import ArticlePutForm from "@/app/_components/postmanagement/articlePutForm";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {checkRole} from "@/utils/roles";

export default async function Page() {
    const user = await currentUser();

    if (!user || !await checkRole('admin')) {
        redirect("/");
    }

    return (
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <ArticlePutForm />
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
    );
}
