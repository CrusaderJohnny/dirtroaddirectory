import {AppShell, AppShellFooter, AppShellHeader, AppShellMain, Button, Center} from "@mantine/core";
import NavMT from "@/app/_components/navcomps/navmt";
// import {currentUser} from "@clerk/nextjs/server";
import ArticlePutForm from "@/app/_components/postmanagement/articlePutForm";
// import {redirect} from "next/navigation";
// import {checkRole} from "@/utils/roles";

export default function Page() {

    // For testing this was commented out
    // if(!user) {
    //     redirect("/");
    // }
    //
    // if(!await checkRole('admin')) {
    //     redirect("/");
    // }
    //
    // // In his example, he passed serializedUser to it
    // const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null;

    return(
        <AppShell>
            <AppShellHeader component={NavMT}/>
            <AppShellMain>
                <Center pt={20}>
                    <ArticlePutForm />
                </Center>
            </AppShellMain>
            <AppShellFooter>
                <Center>
                    <Button component={'a'} href={'/fakeAdmin'}>
                        Return to Admin Page
                    </Button>
                </Center>
            </AppShellFooter>
        </AppShell>
    );
}